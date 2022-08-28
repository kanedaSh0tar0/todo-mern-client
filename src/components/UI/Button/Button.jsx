import cn from 'classnames'

import styles from './Button.module.css'

function Button({ children, classes, click }) {
    return (
        <button onClick={click} className={cn(styles.btn, classes)}>{children}</button>
    );
}

export default Button