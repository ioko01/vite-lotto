import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './features/modal/modalSlice'
import billReducer from "./features/bill/billSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        bill: billReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch