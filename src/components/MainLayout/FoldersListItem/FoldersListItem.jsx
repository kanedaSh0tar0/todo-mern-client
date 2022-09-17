import cn from 'classnames'
import { useDrop } from 'react-dnd'

import fetchInterceptor from '../../../utils/fetchInterceptor'

import styles from './FoldersListItem.module.css'

function FoldersListItem({ folder, classes, click }) {
    const movingToFolder = async (folderId, todoId) => {
        fetchInterceptor('todo/folder', {
            method: 'PATCH',
            body: JSON.stringify({ folderId, todoId })
        })
    }

    const [{ isOver }, drop] = useDrop({
        accept: 'todo',
        drop: item => movingToFolder(folder._id, item.id),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    return (
        <div
            className={cn(styles.folder, isOver && styles.folder_over, classes)}
            onClick={click}
            ref={drop}
        >
            <div className={styles.color} style={{ backgroundColor: folder.color && `#${folder.color}` }} />
            {folder.name}
        </div>
    )
}

export default FoldersListItem