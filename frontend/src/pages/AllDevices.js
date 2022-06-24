import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDevices, reset } from '../features/device/deviceSlice'
import Spinner from '../components/shared/Spinner'
import BackButton from '../components/BackButton'

function AllDevices() {
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
    <div>AllDevices</div>
    {devices.map((device) => (<>
   
          <h3 key={device._id}> {device.product}  </h3>
      
        
          </>
        ))}
      
    </>
  )
}

export default AllDevices