import cn from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { useDrag } from 'react-dnd'

import { requestHelper } from '../../../utils/requestHelper'

import DeleteIcon from '../../../assets/img/DeleteIcon/DeleteIcon'
import Checkbox from '../../UI/Checkbox/Checkbox'
import DocumentIcon from '../../../assets/img/DocumentIcon/DocumentIcon'

import styles from './Todo.module.css'

function Todo({ todo, deleteTodo, setTodos }) {
    const [completed, setCompleted] = useState(todo.completed)
    const [open, setOpen] = useState(false)
    const [openHeight, setOpenHeight] = useState({ maxHeight: 0 })
    const hideContent = useRef(null)

    useEffect(() => {
        if (open) {
            setOpenHeight({ maxHeight: `${hideContent.current.scrollHeight}px` })
        }
        else setOpenHeight({})
    }, [open])

    const toggleComplete = () => {
        setCompleted(!completed)
        const editedTodo = Object.assign({}, todo, { completed: !completed })
        requestHelper('todo/edit', 'PATCH', JSON.stringify(editedTodo))
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'todo',
        item: { id: todo._id, folder: todo.folder },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
        end: (item, monitor) => {
            if (monitor.didDrop() && item.folder) {
                setTodos(prev => {
                    return prev.filter(prevTodo => prevTodo._id !== item.id)
                })
            }
        }
    }))

    return (
        <div
            className={cn(styles.item, isDragging && styles.dragged, open && styles.item_open, completed && styles.completed)}
            ref={drag}
        >
            <Checkbox click={toggleComplete} completed={completed} classes={styles.checkbox} />


            <div onClick={() => todo.text && setOpen(!open)} className={cn(styles.main)}>
                <div className={styles.content}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{todo.title}</h2>
                        {todo.text && <DocumentIcon />}
                    </div>
                </div>

                <div ref={hideContent} style={openHeight} className={styles.hideContent}>
                    <p className={styles.text}>{todo.text}</p>
                </div>
            </div>

            <DeleteIcon click={() => deleteTodo(todo._id)} classes={styles.delete} />
        </div >
    )
}

export default Todo