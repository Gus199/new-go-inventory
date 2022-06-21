import { Navigate, Outlet } from 'react-router-dom'
import {useAuthStatis} from '../hooks/useAuthstatis'
import Spinner from './shared/Spinner'

function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatis()
    if(checkingStatus) {
    return <Spinner />
    }
  return loggedIn ? <Outlet />:<Navigate to='/login' />
   
}

export default PrivateRoute