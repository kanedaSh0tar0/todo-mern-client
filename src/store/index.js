import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'

import user from './user'
import todos from './todos'
import folders from './folders'
import alert from './alert'
import modal from './modal'

export default configureStore({
    reducer: {
        user,
        todos,
        folders,
        alert,
        modal
    },
    composeWithDevTools
})