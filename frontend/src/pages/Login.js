import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {login} from '../features/auth/authSlice'
import Spinner from '../components/shared/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // handle password Eye
  const [passwordEye, setPasswordEye] = useState(false);


  const handelePasswordClick = () => {
   
    setPasswordEye(!passwordEye);
    
   
  };
 
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  
   // Redirect when logged in
   if (isSuccess || user) {
    
    navigate('/')
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError])

  useEffect(() => {
if(isSuccess) {
  toast.success('success')

}
  }, [isSuccess])
   
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }
  if(isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        {/* <h1>
          <FaSignInAlt /> 
        </h1> */}
        <p>Please log in to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type={passwordEye === false ? "password" : "text"}
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
             {/* <div className="text-10xl absolute top-12 right-5"> */}
             <div className="aif">
              {passwordEye === false ? (
                <AiFillEyeInvisible onClick={handelePasswordClick} />
              ) : (
                <AiFillEye onClick={handelePasswordClick} />
              )}
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
