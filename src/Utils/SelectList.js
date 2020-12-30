
import React, { useState } from 'react'
import uuid from 'react-uuid'
import './styles.css'

function SelectList({ attribute, options, parentSetState }) {

    const [selected, setSelected] = useState('All')

    const handleChange = (e) => {
        setSelected(e.target.value)
        parentSetState(e.target.value)
    }

    return (
        <div className="selectlist">
            <div className="selectlist-attribute">
                { attribute }
            </div>
            <select
                value={ selected }
                onChange={(e) => { handleChange(e) }}
            >
                <option key='0' value='All'> 
                    All 
                </option>
                {
                    options.map((option) => (
                        <option
                            key={options.id || uuid()}
                            value={options.value}
                        >
                            { option.value }
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectList
