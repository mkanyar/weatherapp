import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: { actual: '', feelsLike: '', speed: '' } }

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeather: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { addWeather } = weatherSlice.actions
export default weatherSlice.reducer
