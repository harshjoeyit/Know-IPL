import React from 'react'
import './styles.css'

function GameItem({ 
    date, season, team1, team2, winner, 
    winByWickets, winByRuns, venue, city
}) {

    let winResult = "";

    if(winByWickets === "0") {
        winResult = `${winByRuns} runs`
    } else {
        winResult = `${winByWickets} wickets`
    }

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
                    <p>{ winner }</p>
                    <p>{ `won by ${winResult}` }</p>
                </div>
            </div>
            <div className="game-item-row game-venue">
                <span>
                    <i className="fa fa-map-marker" style={{color: '#bf0a16'}} ></i>
                </span>
                <span>{ `${venue}, ${city}` }</span>
            </div>
        </div>
    )
}

export default GameItem
