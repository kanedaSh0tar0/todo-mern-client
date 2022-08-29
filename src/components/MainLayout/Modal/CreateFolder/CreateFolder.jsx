import cn from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { requestHelper } from '../../../../utils/requestHelper'
import { setIsOpen } from '../../../../store/modal'
import { callAlert } from '../../../../store/alert'
import { getFolders } from '../../../../store/folders'
import { colors } from '../../../../utils/folderColors'

import SelectUI from '../../../UI/SelectUI/SelectUI'
import Input from '../../../UI/Input/Input'
import Button from '../../../UI/Button/Button'
import Tooltip from '../../../UI/Tooltip/Tooltip'

import styles from './CreateFolder.module.css'

function CreateFolder() {
    const [folderName, setFolderName] = useState('')
    const [tooltip, setTooltip] = useState({
        isOpen: false,
        text: ''
    })
    const [currentColor, setCurrentColor] = useState(colors[0].value)
    const dispatch = useDispatch()

    const createFolder = () => {
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

        const res = requestHelper('folder/create', 'POST', JSON.stringify({ name: folderName.trim(), color: currentColor }))
        res
            .then(result => {
                dispatch(setIsOpen({ isOpen: false, content: '' }))
                dispatch(getFolders())
                dispatch(callAlert({ message: result.message, type: 'ok' }))
            })
            .catch(err => {
                dispatch(callAlert({ message: 'Something went wrong', type: 'err' }))
            })
    }

    return (
        <>
            <h2 className={styles.title}>Create new folder</h2>

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

            <Button click={createFolder}>Create folder</Button>
        </>
    )
}

export default CreateFolder