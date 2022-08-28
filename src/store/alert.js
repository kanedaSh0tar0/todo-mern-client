import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    message: '',
    type: ''
}

const alert = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        callAlert: (state, action) => {
            state.isOpen = true
            state.message = action.payload.message
            state.type = action.payload.type
        },
        hideAlert: (state) => {
            state.isOpen = false
            state.message = ''
            state.type = ''
        }
    }
})

export const { callAlert, hideAlert } = alert.actions

export default alert.reducer