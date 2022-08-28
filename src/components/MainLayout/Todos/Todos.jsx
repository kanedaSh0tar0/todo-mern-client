import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { requestHelper } from '../../../utils/requestHelper'
import { getTodos } from '../../../store/todos'
import { setIsOpen } from '../../../store/modal'
import { callAlert } from '../../../store/alert'

import Loader from '../../UI/Loader/Loader'
import Todo from '../Todo/Todo'
import FolderMenu from '../FolderMenu/FolderMenu'
import AddIcon from '../../../assets/img/AddIcon/AddIcon'

import styles from './Todos.module.css'

function Todos() {
    const [todos, setTodos] = useState([])
    const folders = useSelector(state => state.folders)
    const fetchTodos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        setTodos(fetchTodos.todos)
    }, [fetchTodos])

    useEffect(() => {
        dispatch(getTodos(folders.currentFolder.id || ''))
    }, [folders, dispatch])

    const deleteTodo = async id => {
        const res = requestHelper('todo/delete', 'DELETE', JSON.stringify({ id }))
        res
            .then(result => {
                dispatch(callAlert({ message: result.message, type: 'ok' }))
                setTodos(todos.filter(todo => todo._id !== id))
            })
            .catch(err => {
                console.log(err)
                dispatch(callAlert({ message: 'Something went wrong', type: 'err' }))
            })
    }

    if (fetchTodos.status === 'pending') return <Loader />

    return (
        <div className={styles.container}>
            <div className={styles.folderContainer}>
                <h2 className={styles.folderName}>{folders.currentFolder.name || 'All'}</h2>
                {folders.currentFolder.name
                    &&
                    <FolderMenu
                        deleteFolder={() => dispatch(setIsOpen({ isOpen: true, content: 'deleteFolder' }))}
                    />
                }
            </div>

            <div className={styles.todoContainer}>
                {todos
                    && todos.map(todo => {
                        return <Todo
                            key={todo._id}
                            todo={todo}
                            deleteTodo={deleteTodo}
                            setTodos={setTodos}
                        />
                    })
                }

                <Link className={styles.addTodo} to="create">
                    <AddIcon classes={styles.addIcon} />
                    <h2 className={styles.addText}>Add todo</h2>
                </Link>
            </div>


        </div>
    )
}

export default Todos