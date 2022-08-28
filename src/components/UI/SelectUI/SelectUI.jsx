import Select from 'react-select'

import './SelectUI.css'

function SelectUI({ options, classes, ...props }) {

    const handleChangeValue = e => {
        props.setValue(e)
    }

    return (
        <Select
            classNamePrefix="react-select"
            value={options.find(option => option.value === props.currentValue)}
            isSearchable={false}
            onChange={handleChangeValue}
            className={classes}
            options={options}
        />
    )
}

export default SelectUI