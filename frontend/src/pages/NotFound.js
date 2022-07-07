import {FaHome} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/shared/Spinner'

function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
     navigate('/')
    }, [1500])
    
  }, [navigate])
  return (
      <div>
    <h1>NotFound </h1>
     <Link to='/'>
         <FaHome /> Back to Home
     </Link>
     <Spinner />
    </div>

  )
}

export default NotFound