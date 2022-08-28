import cn from 'classnames'

import styles from './CreateFolderIcon.module.css'

function AddFolderIcon({ classes, click }) {
    return (
        <svg onClick={click} className={cn(styles.add, classes)} viewBox="0 0 24 24">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            <g className={styles.plus}>
                <line x1="12" x2="12" y1="11" y2="17" />
                <line x1="9" x2="15" y1="14" y2="14" />
            </g>

        </svg>
    )
}

export default AddFolderIcon