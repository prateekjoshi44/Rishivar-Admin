
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authSlice';
import { setAuthData } from '../redux/authSlice';

const SignIn = () => {


  const dispatch = useDispatch();

  const [signIn, signInResponse] = useSignInMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form["email"].value;
    const password = form["password"].value;
    const body = { email, password };
    signIn(body)
      .then((res) => {
        if (!res.error) {
          console.log("Auth Token", res.data);
          dispatch(setAuthData(res.data.token));
        }
      });
  };

  const submitBtnClassname =
    "btn btn-primary align-self-start rounded-pill px-5 shadow w-100";


  return (
    <div className="container h-100">
      <div className="row h-100 align-items-center row-cols-1 row-cols-lg-2 justify-content-center">
        <div className="col">
          <form
            className="card shadow rounded-3 p-lg-5 p-3"
            onSubmit={onSubmit}
            noValidate
          >
            <h1 className='text-center'>Rishivar Admin</h1>
            {/* {/* <Input name={"userName"} labelName={null} containerClass={" mb-3"} required /> */}
            {/* <Input name={"password"} type={"password"} containerClass={" mb-4"} required /> */}

            <input
              type="email"
              name="email"
              className="form-control form-control-sm rounded-pill p-2 ps-3 shadow-sm mb-3 border-info shadow"
              placeholder="User ID"
            />
            <input
              type="password"
              name="password"
              className="form-control form-control-sm rounded-pill p-2 ps-3 shadow-sm mb-3 border-info shadow"
              placeholder="Password"
            />

            {signInResponse.isLoading ? (
              <button className={submitBtnClassname} type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Logging in...
              </button>
            ) : (
              <button className={submitBtnClassname}>Login</button>
            )}
          </form>
        </div>
      </div>
    </div>

  )

}

export default SignIn