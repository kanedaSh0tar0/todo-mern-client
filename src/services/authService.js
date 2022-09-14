import fetchInterceptor from '../utils/fetchInterceptor'
import { API_URL } from '../config'

export default class AuthService {
    static async login({ email, password }) {
        const response = await fetchInterceptor(`${API_URL}auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })

        const userData = await response.json()

        if (!response.ok) {
            throw userData.message
        }

        localStorage.setItem('token', userData.accessToken)

        return userData
    }

    static async registration({ email, password, name, surname }) {
        const response = await fetchInterceptor(`${API_URL}auth/registration`, {
            method: 'POST',
            body: JSON.stringify({ email, password, name, surname })
        })

        const userData = await response.json()

        if (!response.ok) {
            throw userData.message
        }

        localStorage.setItem('token', userData.accessToken)
        return userData
    }

    static async logout() {
        return await fetchInterceptor(`${API_URL}auth/logout`)
    }

    static async refresh() {
        return await fetch(`${API_URL}auth/refresh`, { credentials: 'include' })
    }
}