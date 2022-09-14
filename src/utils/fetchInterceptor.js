import AuthService from '../services/authService'

const fetchInterceptor = async (...args) => {
    const [route, config = {}] = args

    // request interceptor
    config.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    config.credentials = 'include'

    // request
    const response = await fetch(route, config)

    // response interceptor
    if (response.status === 401) {
        try {
            const refreshResponse = await AuthService.refresh()
            const responseBody = await refreshResponse.json()

            if (!refreshResponse.ok) {
                throw responseBody.message
            }

            localStorage.setItem('token', responseBody.accessToken)
            config.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${responseBody.accessToken}`
            }

            return await fetch(route, config)
        } catch (err) {
            console.log(err)
        }

    }

    return response
}

export default fetchInterceptor