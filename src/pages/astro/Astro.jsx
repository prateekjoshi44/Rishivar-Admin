import { useEffect } from 'react'
import Page from '../../layout/Page'
import { useParams } from 'react-router-dom'
import { useGetAstroQuery, usePatchAstroMutation } from '../../services/astroSlice'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import Input from '../../components/form/Input'
import Button from '../../components/form/Button'
import PageLoading from '../../components/PageLoading'
import ProfilePicture from '../../components/ProfilePicture'
import SuccessModal from '../../components/modal/SuccessModal '
import { useResetPasswordMutation } from '../../services/authSlice'

const Astro = () => {

  const { id } = useParams()

  const response = useGetAstroQuery(id)
  const [patchAstro, patchAstroRes] = usePatchAstroMutation()
  const [resetPassword, resetPasswordRes] = useResetPasswordMutation()

  const onSubmit = async (event) => {

    try {
      event.preventDefault()
      const form = event.target

      if (form.checkValidity()) {
        const videoCallPrice = form['video Call Price'].value
        const audioCallPrice = form['audio Call Price'].value
        const chatPrice = form['chat price'].value
        const cutPercentage = form['cut percentage'].value


        const body = { id, chatPrice, cutPercentage, videoCallPrice, audioCallPrice }


        await patchAstro(body)

      }
      else {
        form.classList.add('was-validated')
      }
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    if (patchAstroRes.isSuccess) {
      response.refetch()
    }
  }, [patchAstroRes])


  if (response.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />
  const astro = response.data


  return (
    <Page>


      {patchAstroRes.isSuccess && <SuccessModal message={"Astro is Updated."} />}
      {patchAstroRes.isError && <ApiErrorModal res={patchAstroRes} />}

      {resetPasswordRes.isSuccess && <SuccessModal message={"Password is Updated."} data={resetPasswordRes.data} />}
      {resetPasswordRes.isError && <ApiErrorModal res={resetPasswordRes} />}

      <form className='container' onSubmit={onSubmit} noValidate>

        <div className="row mb-3">
          <div className="col d-flex justify-content-center  ">
            <ProfilePicture size={100} name={astro.name} picture={astro?.astroPicture?.src} />
          </div>
        </div>


        <div className="row row-cols-1 row-cols-lg-2 g-3 mb-3">
          <Input name="name" defaultValue={astro.name} disabled />
          <Input name="status" value={astro.status} disabled />
          {
            astro.status === "Created" ||
            <>

              <Input name="phone number" type="text" defaultValue={astro.phone} disabled />
              <Input name="date of birth" type="date" defaultValue={astro.dob} disabled />
              <Input name="description" type="textarea" defaultValue={astro.description} rows="3" disabled />
              <Input name="experience(in years)" type="number" defaultValue={astro.experience} disabled />
              <Input name="account number" type="number" defaultValue={astro.accountNumber} disabled />
              <Input name="ifsc code" type="number" defaultValue={astro.ifscCode} disabled />

            </>
          }

        </div>

        {
          ["Profiled", "Active"].includes(astro.status) &&
          <div className="row row-cols-1 mb-2">
            <p><b>Categories: </b> {astro.categories.map(category => category.split(' ').join(', ')).join(', ')}</p>
            <p><b>Skills: </b> {astro.skills.map(skill => skill.split(' ').join(', ')).join(', ')}</p>
            <p><b>Languages: </b> {astro.languages.map(language => language.split(' ').join(', ')).join(', ')}</p>
          </div>
        }

        {
          ["Profiled", "Active"].includes(astro.status) &&
          <div className="row row-cols-1 row-cols-lg-3 g-3 mb-3">
            <Input name="video Call Price" type="number" defaultValue={astro.videoCallPrice} prefix="₹" />
            <Input name="audio Call Price" type="number" defaultValue={astro.audioCallPrice} prefix="₹" />
            <Input name="chat price" type="number" defaultValue={astro.chatPrice} prefix="₹" />
            <Input name="cut percentage" type="number" defaultValue={astro.cutPercentage} prefix="₹" />
          </div>
        }

        <div className="row row-cols-1 row-cols-lg-3  g-3 justify-content-center">
          {
            astro.status === "Created" ||
            <Button color={"success"} res={patchAstroRes} className={"w-100"}>Save Details</Button>

          }


          {<Button res={resetPasswordRes} onClick={() => resetPassword({ id })}>Reset Password</Button>}

          {astro.status === "Profiled" && <Button type="button" res={patchAstroRes} onClick={() => patchAstro({ id, status: "Active" })}>Verify</Button>}
          {["Active", "Deleted"].includes(astro.status) && <Button color={"danger"} type="button" className={"w-100"} res={patchAstroRes} onClick={() => patchAstro({ id, status: "Blocked" })}>Block</Button>}

          {astro.status === "Blocked" && <Button type="button" res={patchAstroRes} className={"w-100"} onClick={() => patchAstro({ id, status: "Deleted" })}>Delete</Button>}
        </div>


      </form>
    </Page>

  )

}

export default Astro