import cn from 'classnames'

import styles from './AddIcon.module.css'

function AddIcon({ classes }) {
    return (
        <svg className={cn(styles.add, classes)} viewBox="0 0 32 32">
            <g>
                <path d="M16,23a1,1,0,0,1-1-1V10a1,1,0,0,1,2,0V22A1,1,0,0,1,16,23Z" />
                <path d="M22,17H10a1,1,0,0,1,0-2H22a1,1,0,0,1,0,2Z" />
                <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" />
            </g>
            <g id="frame">
                <rect fill="none" height="32" width="32" />
            </g>
        </svg>
    )
}

export default AddIcon;