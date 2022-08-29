import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API_URL } from '../config'

export const getTodos = createAsyncThunk('todos/getTodos', async (folder, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token') || ''

        const res = await fetch(`${API_URL}api/todo/get${folder ? '?folder=' + folder : ''}`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        const resBody = await res.json()

        if (!res.ok) {
            throw resBody.message
        }

        return resBody
    } catch (err) {
        return rejectWithValue(err)
    }
})

const initialState = {
    status: '',
    todos: []
}

const todos = createSlice({
    name: 'todos',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.todos = action.payload
            })
            .addCase(getTodos.rejected, (state) => {
                state.status = 'rejected'
            })
    }
})

export default todos.reducer