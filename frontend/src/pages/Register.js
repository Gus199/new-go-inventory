import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import {useNavigate} from 'react-router-dom'
import Spinner from "../components/shared/Spinner";

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const { user, isloading,isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


    // handle password Eye
    const [passwordEye, setPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  
    const handelePasswordClick = () => {
      setPasswordEye(!passwordEye);
    };
    const handeleConfirmPasswordClick = () => {
      setConfirmPasswordEye(!confirmPasswordEye);
    };

    
  useEffect(() =>{
   if(isError) {
     toast.error(message)
   }
   // Redirect when login
   if(isSuccess || user) {
     toast.success("Sucess")
    navigate('/')
   }
   dispatch(reset())
  }, [isError,isSuccess,user,message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    }else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  };
  if(isloading) {
    return <Spinner />
  }
  return (
    <>
      <section className="form">
      <section className="heading">
        {/* <h1>
          <FaSignInAlt /> 
        </h1> */}
        <p>Please create an account</p>
      </section>
    

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
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
             {/* eye section */}
             <div className="aif">
              {passwordEye === false ? (
                <AiFillEyeInvisible onClick={handelePasswordClick} />
              ) : (
                <AiFillEye onClick={handelePasswordClick} />
              )}
            </div>
          </div>
          <div className="form-group">
            <input
             type={confirmPasswordEye === false ? "password" : "text"}
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
             {/* eye section */}
             <div className="aif">
              {confirmPasswordEye === false ? (
                <AiFillEyeInvisible onClick={handeleConfirmPasswordClick} />
              ) : (
                <AiFillEye onClick={handeleConfirmPasswordClick} />
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

export default Register;
