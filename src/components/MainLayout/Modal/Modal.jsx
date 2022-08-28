import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setIsOpen } from '../../../store/modal'

import CloseIcon from '../../../assets/img/CloseIcon/CloseIcon'

import DeleteFolder from './DeleteFolder/DeleteFolder'
import CreateFolder from './CreateFolder/CreateFolder'

import styles from './Modal.module.css'

const modalRoot = document.getElementById('modal')

function Modal() {
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    if (modal.isOpen) {
        return createPortal(
            <div className={styles.container} onClick={() => dispatch(setIsOpen({ isOpen: false, content: '' }))}>
                <div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
                    <CloseIcon
                        click={() => dispatch(setIsOpen({ isOpen: false, content: '' }))}
                        classes={styles.close}
                    />
                    {modal.content === 'createFolder' && <CreateFolder />}
                    {modal.content === 'deleteFolder' && <DeleteFolder />}
                </div>
            </div>,
            modalRoot
        )
    }

    return null
}

export default Modal