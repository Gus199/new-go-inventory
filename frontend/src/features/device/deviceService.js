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

const deviceService = {
    createDevice
}

export default deviceService