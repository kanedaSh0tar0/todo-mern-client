import AuthService from '../services/authService'

import { API_URL } from '../config'

const fetchInterceptor = async (...args) => {
    try {

        const [route, config = {}] = args

        // request interceptor
        config.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        config.credentials = 'include'

        // request
        const response = await fetch(`${API_URL}${route}`, config)
        const responseBody = await response.json()

        // response interceptor
        if (response.status === 401) {
            const refreshResponse = await AuthService.refresh()
            const refreshResponseBody = await refreshResponse.json()

            if (!refreshResponse.ok) {
                throw responseBody.message
            }

            localStorage.setItem('token', refreshResponseBody.accessToken)
            config.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshResponseBody.accessToken}`
            }

            const newResponse = await fetch(`${API_URL}${route}`, config)
            const newResponseBody = newResponse.json()

            return newResponseBody
        }

        // Not related to authorization error
        if (!response.ok) {
            throw responseBody.message
        }

        return responseBody
    } catch (err) {
        console.log(err)
    }


}

export default fetchInterceptor