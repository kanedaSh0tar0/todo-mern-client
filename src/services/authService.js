import fetchInterceptor from '../utils/fetchInterceptor'
import { API_URL } from '../config'

export default class AuthService {
    static async login({ email, password }) {
        const response = await fetchInterceptor('auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })

        localStorage.setItem('token', response.accessToken)

        return response
    }

    static async registration({ email, password, name, surname }) {
        const response = await fetchInterceptor('auth/registration', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, surname })
        })

        localStorage.setItem('token', response.accessToken)
        return response
    }

    static async logout() {
        return await fetchInterceptor('auth/logout')
    }

    static async refresh() {
        return await fetch(`${API_URL}auth/refresh`, { credentials: 'include' })
    }
}