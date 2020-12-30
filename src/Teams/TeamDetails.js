
import React, { useState, useEffect } from 'react'
import { getTeamsData } from '../Helpers/helpers'
import PercentCircle from '../Utils/PercentCircle'
import NoResults from '../Error/NoResults'


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
        <div className="team-details">
        {
            (state.details)
                ? (
                    (state.loading)
                        ? (<>Loading...</>)
                        : (
                            <div className="game-item">
                                <h2 className="team-name">
                                    { state.details.team }
                                </h2>
                                <div className="team-stats">
                                    <div className="percent-container">
                                        <h3 className="played-home">Home</h3>
                                        <PercentCircle 
                                            percentage={ state.details.home_win_percentage.substr(0, 2) }
                                        />
                                        <div>
                                            <span className="played-games">
                                                Played { state.details.home_matches }
                                            </span>
                                            <span className="won-games">
                                                Won { state.details.home_wins}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="percent-container">
                                        <h3 className="played-away">Away</h3>
                                        <PercentCircle 
                                            percentage={ state.details.away_win_percentage.substr(0, 2) }
                                        />
                                        <div>
                                            <span className="played-games">
                                                Played { state.details.away_matches }
                                            </span>
                                            <span className="won-games">
                                                Won { state.details.away_wins}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                )
                : <NoResults msg="Select a team"/>
        }
        </div>
    )
}

export default TeamDetails
