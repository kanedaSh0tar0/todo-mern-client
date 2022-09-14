import { API_URL } from '../config'
import fetchInterceptor from '../utils/fetchInterceptor'

export async function requestHelper(route, method, body) {
    try {
        const res = await fetchInterceptor(`${API_URL}${route}`, {
            method,
            body
        })

        const resBody = await res.json()

        if (!res.ok) {
            throw resBody.message
        }

        return resBody

    } catch (err) {
        console.log(err)
    }
}