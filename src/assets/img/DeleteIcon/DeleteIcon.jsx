import cn from 'classnames'

import styles from './DeleteIcon.module.css'

function DeleteIcon({ click, classes }) {
    return (
        <svg onClick={click} className={cn(styles.delete, classes)} viewBox="0 0 32 32">
            <g>
                <path d="M24,31H8a3,3,0,0,1-3-3V9A1,1,0,0,1,7,9V28a1,1,0,0,0,1,1H24a1,1,0,0,0,1-1V9a1,1,0,0,1,2,0V28A3,3,0,0,1,24,31Z" />
                <g className={styles.lid}>
                    <path d="M28,7H4A1,1,0,0,1,4,5H28a1,1,0,0,1,0,2Z" />
                    <path d="M20,7a1,1,0,0,1-1-1V3H13V6a1,1,0,0,1-2,0V2a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1V6A1,1,0,0,1,20,7Z" />
                </g>
                <path d="M16,26a1,1,0,0,1-1-1V11a1,1,0,0,1,2,0V25A1,1,0,0,1,16,26Z" />
                <path d="M21,24a1,1,0,0,1-1-1V13a1,1,0,0,1,2,0V23A1,1,0,0,1,21,24Z" />
                <path d="M11,24a1,1,0,0,1-1-1V13a1,1,0,0,1,2,0V23A1,1,0,0,1,11,24Z" />
            </g>
        </svg>
    )
}

export default DeleteIcon