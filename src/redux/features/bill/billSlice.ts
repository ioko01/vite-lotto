import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { Bill } from '../../../components/Bill'

const initialState: Bill[] = []

export const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        stateBill: (state, action: PayloadAction<Bill[]>) => {
            const bill = action.payload
            state = bill
        }
    },
})

export const { stateBill } = billSlice.actions
export const selectBill = (state: RootState) => state.bill
export default billSlice.reducer