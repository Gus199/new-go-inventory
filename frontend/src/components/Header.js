import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-1" ><span style={{color:'black'}}>Go</span>Ivent</Link>
      </div>

      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}><FaSignOutAlt className="login"/>Logout</button>
          </li>
        ): ( <>
           <li>
              <Link to='/login'><FaSignInAlt className="login"/>Login</Link>
          </li>
          <li>
              <Link to='/register'><FaUser className="login"/>Register</Link>
          </li>
          </>
          )}
        
      </ul>
    </header>
  );
}

export default Header;
