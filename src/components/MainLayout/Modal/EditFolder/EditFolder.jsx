import cn from 'classnames'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { requestHelper } from '../../../../utils/requestHelper'
import { setIsOpen } from '../../../../store/modal'
import { getFolders } from '../../../../store/folders'
import { callAlert } from '../../../../store/alert'
import { colors } from '../../../../utils/folderColors'

import Tooltip from '../../../UI/Tooltip/Tooltip'
import Input from '../../../UI/Input/Input'
import Button from '../../../UI/Button/Button'
import SelectUI from '../../../UI/SelectUI/SelectUI'

import styles from './EditFolder.module.css'

function EditFolder() {
    const dispatch = useDispatch()
    const currentFolder = useSelector(state => state.folders.currentFolder)
    const [folderName, setFolderName] = useState('')
    const [currentColor, setCurrentColor] = useState(colors[0].value)
    const [tooltip, setTooltip] = useState(false)

    useEffect(() => {
        setFolderName(currentFolder.name)
        setCurrentColor(currentFolder.color)
    }, [])

    const editFolder = () => {
        if (!folderName.trim().length) {
            return setTooltip({
                isOpen: true,
                text: 'Field cannot be empty'
            })
        }

        if (folderName.trim().length > 20) {
            return setTooltip({
                isOpen: true,
                text: 'The name of the folder cannot be more than 20 characters'
            })
        }

        const body = {
            name: folderName,
            color: currentColor,
            id: currentFolder.id
        }

        const res = requestHelper('todo/editFolder', 'PATCH', JSON.stringify(body))

        res
            .then(result => {
                dispatch(setIsOpen({ isOpen: false, content: '' }))
                dispatch(getFolders(body))
                dispatch(callAlert({ message: result.message, type: 'ok' }))
            })
            .catch(err => {
                dispatch(callAlert({ message: 'Something went wrong', type: 'err' }))
            })
    }

    return (
        <>
            <h2 className={styles.title}>Edit folder</h2>

            <div className={styles.fieldsContainer}>
                <Tooltip
                    isOpen={tooltip.isOpen}
                    setIsOpen={setTooltip}
                    text={tooltip.text}
                >
                    <Input
                        classes={cn(styles.input, tooltip.isOpen && styles.emptyField)}
                        type="text"
                        placeholder="Folder name"
                        value={folderName}
                        setValue={value => {
                            setFolderName(value)
                            tooltip.isOpen && setTooltip({
                                isOpen: false,
                                text: ''
                            })
                        }}
                    />
                </Tooltip>

                <SelectUI
                    options={colors}
                    classes={styles.select}
                    currentValue={currentColor}
                    setValue={color => setCurrentColor(color.value)}
                />
            </div>

            <Button click={editFolder}>Edit folder</Button>
        </>
    )
}

export default EditFolder