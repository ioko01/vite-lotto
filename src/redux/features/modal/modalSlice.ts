import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface ModalState {
  show: boolean
}

// Define the initial state using that type
const initialState: ModalState = {
  show: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    stateModal: (state, action: PayloadAction<boolean>) => {
      const modal = action.payload
      state.show = modal
    }
  },
})

export const { stateModal } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.modal.show

export default modalSlice.reducer