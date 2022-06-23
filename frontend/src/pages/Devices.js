import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDevices, reset } from '../features/device/deviceSlice'
import Spinner from '../components/shared/Spinner'
import BackButton from '../components/BackButton'
import DeviceItem from '../components/Devicetem'

function Devices() {
  const { devices, isLoading, isSuccess } = useSelector(
    (state) => state.devices
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getDevices())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
  
      <BackButton url='/' />
      <h1>Devices</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {devices.map((device) => (
          <DeviceItem key={device._id} device={device} />
        ))}
      
      </div>
    </>
  )
}

export default Devices
