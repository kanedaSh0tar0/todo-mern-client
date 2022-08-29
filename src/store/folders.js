import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API_URL } from '../config'

export const getFolders = createAsyncThunk('folders/getFolders', async (currentFolder, { dispatch, rejectWithValue }) => {
    try {
        const res = await fetch(`${API_URL}api/todo/folder`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const resBody = await res.json()

        if (!res.ok) {
            throw resBody.message
        }
        console.log(currentFolder);
        if (currentFolder) dispatch(setCurrentFolder(currentFolder))

        return resBody
    } catch (err) {
        console.log(err)
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
                state.status = 'fulfilled'
                state.folders = action.payload
            })
            .addCase(getFolders.rejected, (state) => {
                state.status = 'rejected'
            })
    }
})

export const { setCurrentFolder } = folders.actions

export default folders.reducer