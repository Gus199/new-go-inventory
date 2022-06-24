
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deviceService from './deviceService'

const initialState = {
    devices: [],
    device: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
// Get user tickets
export const getDevices = createAsyncThunk(
  'devices/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await deviceService.getDevices(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get All Devices 
// export const getAllDevices = createAsyncThunk(
//   'devices/getAll',
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState()
//       return await deviceService.getAllDevices(token).auth.user.token
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )


// Get user ticket
export const getDevice = createAsyncThunk(
  'devices/get',
  async (deviceId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await deviceService.getDevice(deviceId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// close  device
export const closeDevice = createAsyncThunk(
  'devices/close',
  async (deviceId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await deviceService.closeDevice(deviceId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)



// Create new ticket
export const createDevice = createAsyncThunk(
    'devices/create',
    async (deviceData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await deviceService.createDevice(deviceData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
  
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers:(builder) => {
        builder
        .addCase(createDevice.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createDevice.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createDevice.rejected, (state, action) => {
            state.isLoading = false
            state.isLoading = false
            state.message = action.payload

        })

        .addCase(getDevices.pending, (state) => {
          state.isLoading = true
      })
      .addCase(getDevices.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.devices = action.payload
      })
      .addCase(getDevices.rejected, (state, action) => {
          state.isLoading = false
          state.isLoading = false
          state.message = action.payload

      })
      .addCase(getDevice.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getDevice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.device = action.payload
    })
    .addCase(getDevice.rejected, (state, action) => {
        state.isLoading = false
        state.isLoading = false
        state.message = action.payload

    })
    .addCase(closeDevice.fulfilled, (state, action) => {
      state.isLoading = false
      state.devices.map((device) =>
          device._id === action.payload._id
            ? (device.status = 'closed')
            : device
        )

  })


    }
})

export const {reset} = deviceSlice.actions
export default deviceSlice.reducer