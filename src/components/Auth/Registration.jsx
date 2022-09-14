import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { registrationUser } from '../../store/user'

import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

import styles from './Auth.module.css'

function Registration() {
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('registrationForm'))?.email || '')
    const [password, setPassword] = useState('')
    const [name, setName] = useState(JSON.parse(localStorage.getItem('registrationForm'))?.name || '')
    const [surname, setSurname] = useState(JSON.parse(localStorage.getItem('registrationForm'))?.surname || '')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('registrationForm', JSON.stringify({ email, name, surname }))
    }, [email, name, surname])

    const handleClick = () => {
        const formBody = {
            email,
            password,
            name,
            surname
        }

        const redirect = () => {
            navigate('/', { replace: true })
        }

        dispatch(registrationUser({ formBody, redirect }))

        const userEmail = JSON.parse(localStorage.getItem('registrationForm')).email
        localStorage.setItem('loginForm', JSON.stringify({ email: userEmail }))
        localStorage.removeItem('registrationForm')
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