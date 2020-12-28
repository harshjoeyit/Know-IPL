
import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'

function SelectList({ options, parentSetState }) {

    const [selected, setSelected] = useState('All')

    const handleChange = (e) => {
        setSelected(e.target.value)
        parentSetState(e.target.value)
    }

    return (
        <div>
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
