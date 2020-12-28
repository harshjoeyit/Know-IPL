
import React from 'react'
import uuid from 'react-uuid'
import './style.css'

export default function TeamIndex({ teams, parentSetState }) {
    return (
        <div className='team-index'>
        {
            teams.map(team => (
                <button
                    className='team-item'
                    key={team.id ||  uuid()}
                    onClick={()=> { parentSetState(team.value) }}
                >
                { team.value }
                </button>
            ))
        }
        </div>
    )
}
