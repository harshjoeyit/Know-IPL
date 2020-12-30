
import React from 'react'

function TeamGameItem({
    date, season, venue, city, homeTeam,
    team1, team2, tossWinner, tossDecision, gameWinner
}) {

    const home = team1 === homeTeam

    return (
        <div className="game-item">
            <div className="game-item-row">
                <div className="date" >{date}</div>
                <div className="season">{season}</div>
            </div>
            <div className="game-item-row game-stats">
                <div className="game-teams">
                    <p className="team">{team1}</p>
                    <i>Vs</i>
                    <p className="team">{team2}</p>
                </div>
                <div className="game-result">
                    {
                        <div className={ home ? 'played-home' : 'played-away'}>
                        {
                            home ? 'Home' : 'Away'
                        }
                        </div>
                    }
                    <p>{`${tossWinner} won the toss and decided to ${tossDecision}`}</p>
                    <p>{`${gameWinner} won the game`}</p>
                </div>
            </div>
            <div className="game-item-row game-venue">
                <span>
                    <i className="fa fa-map-marker" style={{ color: '#bf0a16' }} ></i>
                </span>
                <span>{`${venue}, ${city}`}</span>
            </div>
        </div>
    )
}

export default TeamGameItem
