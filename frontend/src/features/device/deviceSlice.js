
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

    }
})

export const {reset} = deviceSlice.actions
export default deviceSlice.reducer