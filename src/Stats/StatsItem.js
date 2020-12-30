import React from 'react'
import './style.css'
// images
import ball from '../Utils/Images/ball.png'
import bat from '../Utils/Images/bat.png'
import avg from '../Utils/Images/avg.png'
import strike from '../Utils/Images/strike.png'

function StatsItem({ batsman, totalRuns, totalBalls, average ,strikeRate }) {
    return (
        <div className="stats-item">
            <div className="stats-row">
                <h2 className="batsman">{ batsman }</h2>
            </div>
            <div className="stats-row">
                <span>
                    <img src={bat} alt="runs " />
                    <p>{ totalRuns }</p>
                </span>
                <span>
                    <img src={ball} alt="balls " />
                    <p>{ totalBalls }</p>
                </span>
                <span>
                    <img src={avg} alt="avg " />
                    <p>{ average.substr(0, 5) }</p>
                </span>
                <span>
                    <img src={strike} alt="str rate " />
                    <p>{ strikeRate.substr(0, 5) }</p>
                </span>
            </div>
        </div>
    )
}

export default StatsItem
