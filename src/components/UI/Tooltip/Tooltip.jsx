import cn from 'classnames'

import styles from './Tooltip.module.css'

function Tooltip({ children, text, isOpen, setIsOpen }) {
    return (
        <div className={styles.container}>
            {children}
            {
                isOpen
                &&
                <div onClick={() => setIsOpen(false)} className={cn(styles.window, styles.window_bottom)}>{text}</div>
            }
        </div>
    )
}

export default Tooltip