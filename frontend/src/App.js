import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Devices from './pages/Devices';
import Register from './pages/Register';
import NewDevice from './pages/NewDevice';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'





function App() {
  return (<>
  <Router>
    <div className='container'>
      <Header />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/new-device' element={<PrivateRoute />} >
        <Route path='/new-device' element={<NewDevice />} />
        </Route>
        <Route path='/devices' element={<PrivateRoute />}>
              <Route path='/devices' element={<Devices />} />
            </Route>
      </Routes>
    </div>
  </Router>
  <ToastContainer />
  
  </>
    
  );
}

export default App;
