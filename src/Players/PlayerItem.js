import React from 'react'
import bat from '../Utils/Images/bat.png'
import ball from '../Utils/Images/ball.png'
import './styles.css'


function PlayerItem({ playerName, country, battingHand, bowlingSkill }) {
    return (
        <div className="game-item">
            <div className="game-item-row player-basic-info">
                <div className="player-name">{ playerName }</div>
                <div className="country">
                { 
                    country.length > 0 ? country : 'Unavailable' 
                }
                </div>
            </div>
            <div className="game-item-row">
                <div className="skills">
                    <img src={ bat } alt="batting hand" />
                    <p>{ battingHand.split('_').join(' ') }</p>
                </div>
                <div className="skills">
                    <p>{ bowlingSkill }</p>
                    <img src={ ball } alt="bowling skill" />
                </div>
            </div>
        </div>
    )
}

export default PlayerItem
