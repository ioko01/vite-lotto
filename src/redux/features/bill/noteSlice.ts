import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export interface INote {
    note?: string
}

const initialState: INote = {
    note: ""
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<INote>) => {
            const note = action.payload
            state.note = note.note
        },
    },
})

export const { addNote } = noteSlice.actions
export const selectBill = (state: RootState) => state.note
export default noteSlice.reducer