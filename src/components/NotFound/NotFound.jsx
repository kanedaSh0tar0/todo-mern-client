import { useNavigate } from 'react-router-dom'

import Button from '../UI/Button/Button'

import styles from './NotFound.module.css'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div>
                <h1>Not found</h1>
                <Button click={() => navigate(-1)} >Go Back</Button>
            </div>
        </div>
    );
}

export default NotFound;