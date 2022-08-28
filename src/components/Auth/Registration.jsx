import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { callAlert } from '../../store/alert'
import { API_URL } from '../../../config'

import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

import styles from './Auth.module.css'

function Registration() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('registrationForm'))?.email || '')
    const [password, setPassword] = useState(JSON.parse(localStorage.getItem('registrationForm'))?.password || '')
    const [name, setName] = useState(JSON.parse(localStorage.getItem('registrationForm'))?.name || '')
    const [surname, setSurname] = useState(JSON.parse(localStorage.getItem('registrationForm'))?.surname || '')
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('registrationForm', JSON.stringify({ email, password, name, surname }))
    }, [email, password, name, surname])

    const handleClick = async () => {
        const formBody = JSON.stringify({
            email,
            password,
            name,
            surname
        })

        try {
            const res = await fetch(`${API_URL}api/auth/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formBody
            })

            const resBody = await res.json()

            if (!res.ok) {
                console.log(resBody)
                return dispatch(callAlert({
                    message: resBody.message || resBody.errors[0].msg,
                    type: 'error'
                }))
            }

            dispatch(callAlert({ message: resBody.message, type: 'ok' }))
            const userEmail = JSON.parse(localStorage.getItem('registrationForm')).email
            localStorage.setItem('loginForm', JSON.stringify({ email: userEmail, password: '' }))
            localStorage.removeItem('registrationForm')
            navigate('/login')
        } catch (err) {
            console.log(err)
            dispatch(callAlert({
                message: 'Something went wrong',
                type: 'error'
            }))
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.inputWrap}>
                    <Input setValue={setEmail} value={email} type="email" placeholder="Email" />
                    <Input setValue={setPassword} value={password} type="password" placeholder="Password" />
                    <Input setValue={setName} value={name} type="text" placeholder="Name" />
                    <Input setValue={setSurname} value={surname} type="text" placeholder="Surname" />
                </div>

                <Button classes={styles.authBtn} click={handleClick}>Register me</Button>
                <Link className={styles.changeAuth} to="/login">Have account?</Link>
            </div>
        </div>
    );
}

export default Registration