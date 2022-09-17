import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fetchInterceptor from '../utils/fetchInterceptor'

export const getFolders = createAsyncThunk('folders/getFolders', async (_, { rejectWithValue }) => {
    try {
        return await fetchInterceptor('folder/get')
    } catch (err) {
        rejectWithValue(err)
    }
})

const initialState = {
    status: '',
    folders: [],
    currentFolder: {
        name: '',
        id: '',
        color: ''
    }
}

const folders = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setCurrentFolder: (state, action) => {
            state.currentFolder.name = action.payload.name
            state.currentFolder.id = action.payload.id
            state.currentFolder.color = action.payload.color
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getFolders.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getFolders.fulfilled, (state, action) => {
                state.folders = action.payload
                state.status = 'fulfilled'
            })
            .addCase(getFolders.rejected, (state) => {
                state.status = 'rejected'
            })
    }
})

export const { setCurrentFolder } = folders.actions

export default folders.reducer