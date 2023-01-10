import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './features/modal/modalSlice'
import billReducer from "./features/bill/billSlice";
import noteReducer from "./features/bill/noteSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        bill: billReducer,
        note: noteReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch