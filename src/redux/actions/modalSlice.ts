import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface ModalState {
  value: boolean
}

// Define the initial state using that type
const initialState: ModalState = {
  value: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value = true
    },
    decrement: (state) => {
      state.value = false
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.modals.value

export default modalSlice.reducer