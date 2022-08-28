import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getTodos } from '../../../store/todos'
import { setIsOpen } from '../../../store/modal'
import { getFolders, setCurrentFolder } from '../../../store/folders'

import Button from '../../UI/Button/Button'
import FoldersListItem from '../FoldersListItem/FoldersListItem'
import CreateFolderIcon from '../../../assets/img/CreateFolderIcon/CreateFolderIcon'

import styles from './FoldersList.module.css'

function FoldersList() {
    const [foldersList, setFoldersList] = useState([])
    const folders = useSelector(state => state.folders)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        dispatch(getFolders())
    }, [])

    useEffect(() => {
        if (folders.length !== foldersList.length) {
            setFoldersList(folders.folders)
        }
    }, [folders])

    const handleСhooseFolder = (folder) => {
        dispatch(setCurrentFolder({ name: folder.name, id: folder.id }))
        if (location !== '/') {
            navigate('/')
        } else dispatch(getTodos(folder.id))
    }

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <Button click={() => { handleСhooseFolder({ name: '', id: '' }) }}>All todos</Button>
                <CreateFolderIcon classes={styles.creteFolder} click={() => dispatch(setIsOpen({ isOpen: true, content: 'createFolder' }))} />
            </div>
            <ul className={styles.list}>
                {foldersList.map(folder => {
                    return <FoldersListItem
                        key={folder._id}
                        folder={folder}
                        click={() => handleСhooseFolder({ name: folder.name, id: folder._id })}
                        classes={folders.currentFolder.id === folder._id && styles.folder_active}
                    />
                })}
            </ul>
        </div>
    );
}

export default FoldersList;

