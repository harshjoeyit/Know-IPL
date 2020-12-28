
import React, { useState, useEffect } from 'react'
import { getTeamsData } from '../Helpers/helpers'


function TeamDetails({ team }) {

    const [state, setState] = useState({ details: {}, loading: true })

    // get details
    useEffect(() => {
        getTeamDetails()
    }, [team])

    const getTeamDetails = async() => {
        const teamsData = await getTeamsData()
        const details = teamsData.find(item => item.team === team)
        setState({
            details,
            loading: false
        })
    }

    return (
        <div>
            Team Details
            {
                (state.details)
                    ? (
                        (state.loading)
                            ? (<>Loading...</>)
                            : (
                                <>
                                    <p>{state.details.home_win_percentage}</p>
                                    <p>{state.details.away_win_percentage}</p>
                                </>
                            )
                    )
                    : (<>Select a team first</>)
            }
        </div>
    )
}

export default TeamDetails
