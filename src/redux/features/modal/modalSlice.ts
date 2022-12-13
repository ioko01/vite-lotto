import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

type Modal = "DETAIL" | "DELETE"

interface ModalState {
  show: boolean,
  openModal: Modal
}

const initialState: ModalState = {
  show: false,
  openModal: "DELETE"
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    stateModal: (state, action: PayloadAction<ModalState>) => {
      const modal = action.payload
      state.show = modal.show
      state.openModal = modal.openModal
    }
  },
})

export const { stateModal } = modalSlice.actions
export const selectModal = (state: RootState) => state.modal
export default modalSlice.reducer