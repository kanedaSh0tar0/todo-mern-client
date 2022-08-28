import cn from 'classnames'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'

import { hideAlert, callAlert } from '../../../store/alert'

import CloseIcon from '../../../assets/img/CloseIcon/CloseIcon'

import styles from './Alert.module.css'

const alertRoot = document.getElementById('alert')

function Alert() {
    const [showAlert, setShowAlert] = useState(false)
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()
    const timerTime = 2000

    const timerStyle = {
        width: '100%',
        height: '2px',
        backgroundColor: '#fff',
        transition: `${timerTime}ms linear`
    }


    useEffect(() => {
        if (alert.isOpen) {
            setShowAlert(true)

            setTimeout(() => {
                setShowAlert(false)

                setTimeout(() => {
                    dispatch(hideAlert())
                }, 100)
            }, timerTime)
        }

    }, [alert])

    const closeAlert = () => {
        setShowAlert(false)

        setTimeout(() => {
            dispatch(hideAlert())
        }, 100)
    }

    if (alert.isOpen) {
        return createPortal(
            <div className={cn(styles.container, showAlert && styles.container_move)}>
                <div className={cn(styles.header, alert.type === 'ok' ? styles.header_green : styles.header_red)}>
                    <CloseIcon click={closeAlert} classes={styles.close} />
                </div>
                <div style={timerStyle} className={showAlert ? styles.timer_move : ''}></div>
                <div className={styles.message}>{alert.message}</div>
            </div>,
            alertRoot
        )
    }

    return null
}

export default Alert
