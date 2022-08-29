import cn from 'classnames'
import { useDrop } from 'react-dnd'

import { requestHelper } from '../../../utils/requestHelper'

import styles from './FoldersListItem.module.css'

function FoldersListItem({ folder, classes, click }) {
    const movingToFolder = async (folderId, todoId) => {
        const body = JSON.stringify({ folderId, todoId })
        requestHelper('folder/get', 'PATCH', body)
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