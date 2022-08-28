import cn from 'classnames'

import styles from './Checkbox.module.css'

function Checkbox({ completed, click, classes }) {
    return (
        <svg onClick={click} className={cn(styles.checkbox, classes)} viewBox="0 0 32 32">
            <g>
                <path d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
                <path className={cn(styles.mark, completed && styles.mark_active)} d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z" />
            </g>
        </svg>
    )
}

export default Checkbox