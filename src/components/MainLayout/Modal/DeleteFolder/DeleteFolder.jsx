import { useSelector, useDispatch } from 'react-redux'

import { getFolders, setCurrentFolder } from '../../../../store/folders'
import { requestHelper } from '../../../../utils/requestHelper'
import { callAlert } from '../../../../store/alert'
import { setIsOpen } from '../../../../store/modal'

import Button from '../../../UI/Button/Button'

import styles from './DeleteFolder.module.css'

function DeleteFolder() {
    const folders = useSelector(state => state.folders)
    const dispatch = useDispatch()

    const deleteFolder = async () => {
        const res = requestHelper('todo/folder', 'DELETE', JSON.stringify({ folderId: folders.currentFolder.id }))
        res
            .then(result => {
                dispatch(callAlert({ message: result.message, type: 'ok' }))
                dispatch(getFolders())
                dispatch(setIsOpen({ isOpen: false, content: '' }))

                if (folders.folders.length > 1) {
                    folders.folders.forEach((folder, ind) => {
                        if (folder._id === folders.currentFolder.id) {
                            let newCurrentInd = null

                            if (ind > 0) {
                                newCurrentInd = ind - 1
                            } else newCurrentInd = ind + 1

                            dispatch(setCurrentFolder({
                                name: folders.folders[newCurrentInd].name,
                                id: folders.folders[newCurrentInd]._id
                            }))
                        }
                    })
                } else dispatch(setCurrentFolder({ name: '', id: '' }))

            })
            .catch(err => {
                console.log(err)
                dispatch(callAlert({ message: 'Something went wrong', type: 'err' }))
            })
    }

    return (
        <>
            <h2 className={styles.title}>Are you sure you want to remove the folder with all the contents?</h2>

            <div className={styles.buttonsContainer}>
                <Button click={deleteFolder} >Delete</Button>
                <Button click={() => dispatch(setIsOpen({ isOpen: false, content: '' }))} >Cancel</Button>
            </div>
        </>
    )
}

export default DeleteFolder