import React from 'react'

const style = {
    width: '270px',
    margin: 'auto',
    color: 'var(--pink)',
    padding: '5px 10px',
    textAlign: 'center',
    fontSize: '20px',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '3px',
}

const NoResults = ({ msg }) => ( 
    <div style={ style }>
        { msg }
    </div>
)

export default NoResults
