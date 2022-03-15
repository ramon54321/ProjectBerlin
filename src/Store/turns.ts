import { createSlice } from "@reduxjs/toolkit"

const turnsSlice = createSlice({
  name: "turns",
  initialState: 0,
  reducers: {
    increment: (state) => state += 1
  }
})
export const { increment } = turnsSlice.actions

export default turnsSlice.reducer
