import { API_URL } from "../config"

export async function requestHelper(route, method, body) {
    try {
        const res = await fetch(`${API_URL}api/${route}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
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