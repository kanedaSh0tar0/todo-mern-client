import cn from 'classnames'

import styles from './LogoutIcon.module.css'

function LogoutIcon({ classes, click }) {
    return (
        <svg onClick={click} className={cn(styles.logout, classes)} viewBox="0 -2 36 36" >
            <g>
                <path d="M23.93,25v3h-16V4h16V7h2V3a1,1,0,0,0-1-1h-18a1,1,0,0,0-1,1V29a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V25Z" />
                <g className={styles.logoutArrow}>
                    <line x1="15.92" x2="28.92" y1="16" y2="16" />
                    <line x1="28.92" x2="24.92" y1="16" y2="20" />
                    <line x1="28.92" x2="24.92" y1="16" y2="12" />
                </g>
            </g>
        </svg>
    )
}

export default LogoutIcon;