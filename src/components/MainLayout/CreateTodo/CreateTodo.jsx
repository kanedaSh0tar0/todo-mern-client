import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { requestHelper } from '../../../utils/requestHelper'
import { setCurrentFolder } from '../../../store/folders'
import { callAlert } from '../../../store/alert'
import { setIsOpen } from '../../../store/modal'

import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import SelectUI from '../../UI/SelectUI/SelectUI'
import Tooltip from '../../UI/Tooltip/Tooltip'

import styles from './CreateTodo.module.css'

function CreateTodo() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [tooltip, setTooltip] = useState({
        isOpen: false,
        text: ''
    })
    const dispatch = useDispatch()
    const folders = useSelector(state => state.folders.folders)
    const currentFolder = useSelector(state => state.folders.currentFolder)

    useEffect(() => {
        if (!currentFolder.id) dispatch(setCurrentFolder({ id: folders[0]?._id, name: folders[0]?.name }))
    }, [])

    const createTodo = () => {
        if (!title.trim().length) {
            return setTooltip({
                isOpen: true,
                text: 'Field cannot be empty'
            })
        }

        if (title.trim().length > 50) {
            return setTooltip({
                isOpen: true,
                text: 'The title cannot be longer than 50 characters'
            })
        }

        const newTodo = JSON.stringify({
            title: title.trim(),
            text,
            folder: currentFolder.id,
            date: Date.now()
        })

        const res = requestHelper('todo/create', 'POST', newTodo)
        res
            .then(result => {
                dispatch(callAlert({ message: result.message, type: 'ok' }))
                setTitle('')
                setText('')
            })
            .catch(err => {
                dispatch(callAlert({ message: 'Something went wrong', type: 'err' }))
            })
    }

    return (
        <div className={styles.container}>
            {folders.length > 0
                && <SelectUI
                    options={folders.map(option => {
                        return { value: option._id, label: option.name }
                    })}
                    classes={styles.select}
                    setValue={item => dispatch(setCurrentFolder({ name: item.label, id: item.value }))}
                    currentValue={currentFolder.id}
                />
            }

            <Tooltip
                isOpen={tooltip.isOpen}
                setIsOpen={setTooltip}
                text={tooltip.text}
            >
                <Input
                    type="text"
                    value={title}
                    setValue={value => {
                        setTitle(value)
                        tooltip.isOpen && setTooltip({ isOpen: false, text: '' })
                    }}
                    placeholder="Title"
                    classes={tooltip.isOpen && styles.emptyField}
                />
            </Tooltip>

            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Text"
                className={styles.text}
            />

            <Button click={createTodo}>Add To Do</Button>
        </div >
    )
}

export default CreateTodo