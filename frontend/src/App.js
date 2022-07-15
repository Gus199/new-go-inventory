import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AllDevices from "./pages/AllDevices";
import Devices from "./pages/Devices";
import Device from "./pages/Device";
import Register from "./pages/Register";
import NewDevice from "./pages/NewDevice";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-device" element={<PrivateRoute />}>
              <Route path="/new-device" element={<NewDevice />} />
            </Route>
            <Route path="/devices" element={<PrivateRoute />}>
              <Route path="/devices" element={<Devices />} />
            </Route>
            <Route path="/device/:deviceId" element={<PrivateRoute />}>
              <Route path="/device/:deviceId" element={<Device />} />
            </Route>
            <Route path="/all" element={<PrivateRoute />}>
              <Route path="/all" element={<AllDevices />} />
            </Route>
            <Route path="/*" element={<PrivateRoute />}>
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
