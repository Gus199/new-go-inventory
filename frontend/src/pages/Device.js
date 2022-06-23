import { useEffect } from 'react'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getDevice, reset, closeDevice} from '../features/device/deviceSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/shared/Spinner'
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'


function Device() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth);
    const {device, isLaoding,isError, message } = useSelector((state) => state.devices) 
    const params = useParams()
    const dispatch = useDispatch()
    const {deviceId} = useParams()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getDevice(deviceId))
        //  eslint-disble-next-line
    }, [isError, message, deviceId])

     // Close Case
  const onDeviceClose = () => {
    dispatch(closeDevice(deviceId))
    toast.success('Case Closed')
    navigate('/devices')
  }
    if(isLaoding) {
        return <Spinner />
    }
    if(isError) {
        return<h3>Something when Wrong</h3>
    }
  return (
    <div className='ticket-page'>
          <header className='ticket-header'>
        <BackButton url='/devices' />
        <h2>
          Ticket ID: {device._id}
          <span className={`status status-${device.status}`}>
            {device.status}
          </span>
        </h2>
        <h3>Created by: {user.name}</h3>
        <h3>
          Date Submitted: {new Date(device.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {device.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{device.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {device.status !== 'closed' && (
        <button onClick={onDeviceClose} className='btn btn-block btn-danger'>
          Close device
        </button>
      )}
    </div>
  )
}

export default Device