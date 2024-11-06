
import Button from "../../components/form/Button";
import CheckboxGroup from "../../components/form/CheckboxGroup";
import Input from "../../components/form/Input";
import PhoneNumberInput from "../../components/form/PhoneNumberInput";
import ProfilePictureInput from "../../components/form/ProfilePictureInput";
import ApiErrorModal from "../../components/modal/ApiErrorModal";
import SuccessModal from "../../components/modal/SuccessModal ";
import { CATEGORIES, LANGUAGES, SKILLS } from "../../constants/Constants";
import Page from "../../layout/Page";
import { useCreateAstroMutation } from "../../services/astroSlice";
import { usePostUploadMutation } from "../../services/uploadSlice";


const CreateAstro = () => {

    const [createAstro, createAstroRes] = useCreateAstroMutation();
    const [uploadImage, uploadImageRes] = usePostUploadMutation();

    const onSubmit = async (event) => {
        console.log("onsubmit chala")

        try {
            event.preventDefault();
            const form = event.target;

            // name, dob, description, phone, email, chatPrice, audioCallPrice, videoCallPrice, cutPercentage, languages, experience, skills, categories, accountNumber, ifscCode 

            if (form.checkValidity()) {
                const name = form["name"].value;
                const email = form["email"].value;
                const phone = form["phone"].value.replace("-", "").replace(" ", "");
                const dob = form["date of birth"].value;
                const description = form["description"].value;
                const videoCallPrice = form['video Call Price'].value;
                const audioCallPrice = form['audio Call Price'].value;
                const chatPrice = form["chat price"].value;
                const experience = form["experience(in years)"].value;
                const languages = Array.from(form["languages"]).filter((i) => i.checked).map((i) => i.id);
                const categories = Array.from(form["categories"]).filter((i) => i.checked).map((i) => i.id);
                const skills = Array.from(form["skills"]).filter((i) => i.checked).map((i) => i.id);
                const accountNumber = form["account number"].value;
                const ifscCode = form["IFSC code"].value;
                const cutPercentage = form['cut percentage'].value

                let uploadId = undefined;
                if (form["profilePicture"].files.length === 1) {
                    const file = form["profilePicture"].files[0];
                    const uploadBody = new FormData();
                    uploadBody.append("upload", file);
                    console.log("mai chala before uploadimage")
                    const res = await uploadImage(uploadBody);
                    console.log("mai chala after uploadimage")
                    if (res.error) throw new Error("message");
                    uploadId = res.data.id;
                }
                console.log("mai chala before createAstro")
                await createAstro({
                    name,
                    phone,
                    dob,
                    email,
                    description,
                    videoCallPrice, audioCallPrice,
                    chatPrice,
                    experience,
                    languages,
                    categories,
                    skills,
                    accountNumber,
                    ifscCode,
                    uploadId,
                    cutPercentage
                });
                console.log("mai chala after createAstro")

            } else {
                form.classList.add("was-validated");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Page>
            <form onSubmit={onSubmit} noValidate>
                {createAstroRes.isError && <ApiErrorModal res={createAstroRes} />}
                {uploadImageRes.isError && <ApiErrorModal res={uploadImageRes} />}
                {createAstroRes.isSuccess && <SuccessModal message={"Astro is Created"} data={createAstroRes.data} />}


                <div className="row mb-3">
                    <div className="col d-flex justify-content-center">
                        <ProfilePictureInput name="profilePicture" />
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-lg-2 g-3 mb-4">
                    <Input name="name" required />
                    <Input name="email" type="email" required />
                    <PhoneNumberInput name={"phone"} required />
                    <Input name="date of birth" type="date" required />
                    <Input name="description" type="textarea" rows="3" required />
                    <Input name="video Call Price" type="number" prefix="₹" required />
                    <Input name="audio Call Price" type="number" prefix="₹" required />
                    <Input name="chat price" type="number" prefix="₹" required />
                    <Input name="experience(in years)" type="number" required />
                    <Input name="cut percentage" type="number" required />
                    <Input name="account number" type="number" required />
                    <Input name="IFSC code" type="number" required />
                </div>

                <CheckboxGroup name="languages" options={LANGUAGES} rowClassName={"row-cols-lg-5 row-cols-3 g-3 mb-3"} />
                <CheckboxGroup name="categories" options={CATEGORIES} rowClassName={"row-cols-lg-5 row-cols-3 g-3 mb-3"} />
                <CheckboxGroup name="skills" options={SKILLS} rowClassName={"row-cols-lg-5 row-cols-3 g-3 mb-3"} />

                <div className="row row-cols-3 justify-content-center">
                    <Button res={createAstroRes} >Submit</Button>
                </div>
            </form>
        </Page >
    )
}

export default CreateAstro

