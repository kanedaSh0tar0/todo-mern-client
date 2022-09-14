import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import AuthService from '../services/authService'

export const loginUser = createAsyncThunk('user/loginUser', async ({ formBody, redirect }, { rejectWithValue }) => {
    try {
        const userData = await AuthService.login(formBody)

        redirect()
        return userData
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const registrationUser = createAsyncThunk('user/registrationUser', async ({ formBody, redirect }, { rejectWithValue }) => {
    try {
        const userData = await AuthService.registration(formBody)

        redirect()
        return userData
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await AuthService.refresh()
        const responseBody = await response.json()

        localStorage.setItem('token', responseBody.accessToken)
        return responseBody
    } catch (err) {
        return rejectWithValue(err)
    }
})

const initialState = {
    status: '',
    currentUser: {},
    isAuth: false
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            const res = AuthService.logout()
            console.log(res)
            localStorage.removeItem('token')
            state.status = 'logout'
            state.currentUser = {}
            state.isAuth = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload.user
                state.isAuth = true
                state.status = 'fulfilled'
            })
            .addCase(loginUser.rejected, (state, action) => {
                alert(action.payload)
                state.currentUser = {}
                state.isAuth = false
                state.status = 'rejected'
            })
            .addCase(registrationUser.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(registrationUser.fulfilled, (state, action) => {
                state.currentUser = action.payload.user
                state.isAuth = true
                state.status = 'fulfilled'
            })
            .addCase(registrationUser.rejected, (state, action) => {
                alert(action.payload)
                state.currentUser = {}
                state.isAuth = false
                state.status = 'rejected'
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.currentUser = action.payload.user
                state.isAuth = true
                state.status = 'fulfilled'
            })
            .addCase(checkAuth.rejected, (state, action) => {
                alert(action.payload)
                state.currentUser = {}
                state.isAuth = false
                state.status = 'rejected'
            })
    }
})

export const { logout } = user.actions

export default user.reducer