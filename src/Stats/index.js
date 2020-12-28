import React, { useState, useEffect } from 'react'
// helpers 
import { getStatsData } from '../Helpers/request'
import { 
    byAverage, byNumberOfBalls, 
    byStrikeRate, byTotalRuns 
} from '../Helpers/comparator'

import uuid from 'react-uuid'


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
        if(type === "runs") {
            stats = state.stats.sort(byTotalRuns)
        } 
        else if(type === "balls") {
            stats = state.stats.sort(byNumberOfBalls)
        }
        else if(type === "avg") {
            stats = state.stats.sort(byAverage)
        }
        else if(type === "strike") {
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
            <div>
                <button onClick={() => { handleClick("runs") }} > Most Runs </button>
                <button onClick={() => { handleClick("balls") }} >Most Balls Faced </button>
                <button onClick={() => { handleClick("avg") }} >Best Average </button>
                <button onClick={() => { handleClick("strike") }} >Best Strike Rate</button>
            </div>
            {
                (!state.loading)
                ? (
                    state.stats.map(item => (
                        <p key={ uuid() }>
                            {item.batsman} {item.total_runs} {item.average} {item.strikerate}
                        </p>
                    ))
                )
                : (<></>)
            }
        </div>
    )
}

export default Stats
