import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'

// helpers 
import { getStatsData } from '../Helpers/request'
import {
    byAverage, byNumberOfBalls,
    byStrikeRate, byTotalRuns
} from '../Helpers/comparator'
import StatsItem from './StatsItem'

// images
import ball from '../Utils/Images/ball.png'
import bat from '../Utils/Images/bat.png'
import avg from '../Utils/Images/avg.png'
import strike from '../Utils/Images/strike.png'


const Stats = () => {

    const [state, setState] = useState({ stats: [], loading: true })

    useEffect(() => {

        getStatsData()
            .then(data => {
                setState(prevState => ({
                    ...prevState,
                    stats: data.slice(0, 100),
                    loading: false
                }))
            })
            .catch(console.log)
    }, [])


    // handle change in sort
    const handleClick = (type) => {
        let stats = []
        if (type === "runs") {
            stats = state.stats.sort(byTotalRuns)
        }
        else if (type === "balls") {
            stats = state.stats.sort(byNumberOfBalls)
        }
        else if (type === "avg") {
            stats = state.stats.sort(byAverage)
        }
        else if (type === "strike") {
            stats = state.stats.sort(byStrikeRate)
        }

        // set state 
        setState(prevState => ({
            ...prevState,
            stats: stats,
        }))
    }

    return (
        <div>
            <div className="sorting-options">
                <button onClick={() => { handleClick("runs") }} >
                    <img src={bat} alt="runs " />
                    <span>Most Runs</span>
                </button>
                <button onClick={() => { handleClick("balls") }} >
                    <img src={ball} alt="balls " />
                    <span>Most Balls Faced</span>
                </button>
                <button onClick={() => { handleClick("avg") }} >
                    <img src={avg} alt="avg " />
                    <span>Best Average</span>
                </button>
                <button onClick={() => { handleClick("strike") }} >
                    <img src={strike} alt="stk rate " />
                    <span>Best Strike Rate</span>
                </button>
            </div>

            <div className="result-list">
                {
                    (!state.loading)
                        ? (
                            state.stats.map(item => (
                                <StatsItem
                                    key={uuid()}
                                    batsman={item.batsman}
                                    totalRuns={item.total_runs}
                                    totalBalls={item.numberofballs}
                                    average={item.average}
                                    strikeRate={item.strikerate}
                                />
                            ))
                        )
                        : (<></>)
                }
            </div>
        </div>
    )
}

export default Stats
