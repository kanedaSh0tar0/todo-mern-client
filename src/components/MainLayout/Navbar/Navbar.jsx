import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentFolder } from '../../../store/folders'
import { logout } from '../../../store/user'

import FoldersList from '../FoldersList/FoldersList'
import LogoutIcon from '../../../assets/img/LogoutIcon/LogoutIcon'
import logo from '../../../assets/img/todoLogo.svg'

import styles from './Navbar.module.css'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const moveToAllTodos = () => {
        navigate('/')
        dispatch(setCurrentFolder({ name: '', id: '', color: '' }))
    }

    const handleLogout = () => {
        navigate('/login')
        dispatch(logout())
    }

    return (
        <div className={styles.container}>
            <div className={styles.logoArea}>
                <img onClick={moveToAllTodos} className={styles.logo} src={logo} alt="Logo" />
                <h2 className={styles.greetings}>
                    Hello
                    <br />
                    {user.currentUser.name}
                </h2>

                <LogoutIcon click={handleLogout} classes={styles.logout} />
            </div>

            <FoldersList />
        </div>
    );
}

export default Navbar