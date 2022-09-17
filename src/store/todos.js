import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchInterceptor from '../utils/fetchInterceptor'

export const getTodos = createAsyncThunk('todos/getTodos', async (folder, { rejectWithValue }) => {
    try {
        return await fetchInterceptor(`todo/get${folder ? '?folder=' + folder : ''}`)
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
                state.todos = action.payload
                state.status = 'fulfilled'
            })
            .addCase(getTodos.rejected, (state) => {
                state.status = 'rejected'
            })
    }
})

export default todos.reducer