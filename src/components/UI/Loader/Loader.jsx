import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from './Loader.module.css'

function Loader() {
    const [active, setActive] = useState(false)
    const todos = useSelector(state => state.todos)
    const user = useSelector(state => state.user)
    const folders = useSelector(state => state.folders)

    useEffect(() => {
        if (
            todos.status === 'pending' ||
            // user.status === 'pending' ||
            folders.status === 'pending'
        ) {
            setActive(true)
        }
        else setActive(false)

    }, [todos, user, folders])

    if (!active) return null

    return (
        <div className={styles.container}>
            <span className={styles.loader}></span>
        </div>
    )
}

export default Loader