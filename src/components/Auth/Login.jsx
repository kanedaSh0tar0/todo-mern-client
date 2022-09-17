import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { loginUser } from '../../store/user'
import { getTodos } from '../../store/todos'
import { getFolders } from '../../store/folders'

import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import Tooltip from '../UI/Tooltip/Tooltip'

import styles from './Auth.module.css'

function Login() {
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('loginForm'))?.email || '')
    const [password, setPassword] = useState(JSON.parse(localStorage.getItem('loginForm'))?.password || '')
    const [tooltipMail, setTooltipMail] = useState({
        isOpen: false,
        text: ''
    })
    const [tooltipPassword, setTooltipPassword] = useState({
        isOpen: false,
        text: ''
    })
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const fromPage = location.state?.form?.pathname || '/'

    const redirect = () => {
        navigate(fromPage, { replace: true })
    }

    const handleLogin = () => {
        if (!email.trim().length) {
            return setTooltipMail({
                isOpen: true,
                text: 'Field cannot be empty'
            })
        }

        if (!password.trim().length) {
            return setTooltipPassword({
                isOpen: true,
                text: 'Field cannot be empty'
            })
        }

        const formBody = { email, password }
        dispatch(loginUser({ formBody, redirect }))
            .then(() => {
                dispatch(getTodos())
                dispatch(getFolders())
            })

        localStorage.setItem('loginForm', JSON.stringify({ email }))
    }

    useEffect(() => {
        localStorage.setItem('loginForm', JSON.stringify({ email }))
    }, [email])

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.inputWrap}>
                    <Tooltip
                        isOpen={tooltipMail.isOpen}
                        setIsOpen={setTooltipMail}
                        text={tooltipMail.text}
                    >
                        <Input
                            setValue={value => {
                                setEmail(value)
                                setTooltipMail({ isOpen: false, text: '' })
                            }}
                            value={email}
                            type="email"
                            placeholder="Email"
                            classes={tooltipMail.isOpen && styles.emptyField}
                        />
                    </Tooltip>
                    <Tooltip
                        isOpen={tooltipPassword.isOpen}
                        setIsOpen={setTooltipPassword}
                        text={tooltipPassword.text}
                    >
                        <Input
                            setValue={value => {
                                setPassword(value)
                                setTooltipPassword({ isOpen: false, text: '' })
                            }}
                            value={password}
                            type="password"
                            placeholder="Password"
                            classes={tooltipPassword.isOpen && styles.emptyField}
                        />
                    </Tooltip>
                </div>

                <Button classes={styles.authBtn} click={handleLogin}>Login</Button>
                <Link className={styles.changeAuth} to="/registration">Don`t have account?</Link>
            </div>
        </div>
    )
}

export default Login