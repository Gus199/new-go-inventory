import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createDevice, reset} from '../features/device/deviceSlice'
import Spinner from "../components/shared/Spinner";
import BackButton from '../components/BackButton'
// import RatingSelect from "../components/RatingSelect";

function NewDevice() {
  // const [rating, setRating] = useState(10)
  const { user } = useSelector((state) => state.auth);
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.devices)
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/devices')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(product)
    dispatch(createDevice({ product, description }))
  }
if (isLoading){
return <Spinner />
}

  return (
    <>
    
    <BackButton  url='/' />
         <section className='heading'>
         <h2>Device Condition</h2>
  
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
        {/* <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating} /> */}
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewDevice;
