import cn from 'classnames'

import styles from './Input.module.css'

function Input({ type, placeholder, classes, value, setValue }) {
    return (
        <input
            onChange={e => setValue(e.target.value)}
            value={value}
            className={cn(styles.input, classes)}
            type={type}
            placeholder={placeholder}
        />
    );
}

export default Input;