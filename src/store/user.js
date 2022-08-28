import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API_URL } from '../../config'

export const loginUser = createAsyncThunk('user/loginUser', async ({ formBody, redirect }, { rejectWithValue }) => {
    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formBody
        })

        const resBody = await res.json()

        if (!res.ok) {
            throw resBody.message
        }

        localStorage.setItem('token', resBody.token)
        redirect()
        return resBody
    } catch (err) {
        return rejectWithValue(err)
    }
}
)

export const authUser = createAsyncThunk('user/authUser', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token') || ''

        const res = await fetch(`${API_URL}/api/auth/auth`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        const resBody = await res.json()

        if (!res.ok) {
            throw resBody.message
        }

        localStorage.setItem('token', resBody.token)
        return resBody
    } catch (err) {
        localStorage.removeItem('token')
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
                state.status = 'fulfilled'
                state.currentUser = action.payload.user
                state.isAuth = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                alert(action.payload)
                state.status = 'rejected'
                state.currentUser = {}
                state.isAuth = false
            })
            .addCase(authUser.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.currentUser = action.payload.user
                state.isAuth = true
            })
            .addCase(authUser.rejected, (state) => {
                state.status = 'rejected'
                state.currentUser = {}
                state.isAuth = false
            })
    }
})

export const { logout } = user.actions

export default user.reducer