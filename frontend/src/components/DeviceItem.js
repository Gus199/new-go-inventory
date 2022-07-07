import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";


function DeviceItem({ device }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className='ticket'>
        
      <div>{new Date(device.createdAt).toLocaleString('en-US')}</div>
      <div>{device.product}</div>
      <div>{user.name}</div>
      
      
    
      <div className={`status status-${device.status}`}>{device.status}</div>
      <Link to={`/device/${device._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default DeviceItem
