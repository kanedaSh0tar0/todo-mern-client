import DeleteIcon from '../../../assets/img/DeleteIcon/DeleteIcon'
import EditIcon from '../../../assets/img/EditIcon/EditIcon'
import GearIcon from '../../../assets/img/GearIcon/GearIcon'

import styles from './FolderMenu.module.css'

function FolderMenu({ deleteFolder }) {
    return (
        <div className={styles.container}>
            <GearIcon classes={styles.gear} />

            <div className={styles.menu}>
                <div className={styles.menuItem}>
                    <DeleteIcon click={deleteFolder} classes={styles.itemIcon} />
                </div>
                <div className={styles.menuItem}>
                    <EditIcon classes={styles.itemIcon} />
                </div>
            </div>
        </div>
    )
}

export default FolderMenu