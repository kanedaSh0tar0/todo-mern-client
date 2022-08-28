import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    content: ''
}

const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload.isOpen
            state.content = action.payload.content
        }
    }
})

export const { setIsOpen } = modal.actions

export default modal.reducer