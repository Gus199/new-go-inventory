import axios from "axios";


const API_URL = '/api/devices/'

// create new device:

const createDevice = async (deviceData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    }

    const response = await axios.post(API_URL, deviceData, config)

    return response.data
}
// Get user Devices
const getDevices = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }

  // Get all Devices
// const getAllDevices = async (token) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
  
//     const response = await axios.get(API_URL , config)
  
//     return response.data
//   }

  // Get  Device
const getDevice = async (deviceId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + deviceId, config)
  
    return response.data
  }


  // close  Device
const closeDevice = async (deviceId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_URL + deviceId,{status: 'closed'}, config)
  
    return response.data
  }



const deviceService = {
    createDevice,
    getDevices,
    getDevice,
    closeDevice,
    // getAllDevices,
}

export default deviceService