import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'
// helpers
import { filterAllGames } from '../Helpers/filters'
import {
    getVenueOptions, getSeasonOptions, getTeamsOptions
} from '../Helpers/options'

// child components 
import SelectList from '../Utils/SelectList'
import GameItem from './GameItem'
import NoResults from '../Error/NoResults'


const Games = () => {

    const initOptionState = {
        teamsOptions: [],
        seasonOptions: [],
        venueOptions: [],
    }
    const initFilterState = {
        season: 'All',
        team: 'All',
        venue: 'All'
    }

    // states 
    const [optionState, setOptionState] = useState(initOptionState)
    const [filterState, setFilterState] = useState(initFilterState)
    const [results, setResults] = useState([])

    // get options
    useEffect(() => {
        getOptions()
    }, [])

    // refresh results
    useEffect(() => {
        refreshResults()
    }, [filterState])

    // get options for dropdown
    const getOptions = async () => {
        const teamsOptions = await getTeamsOptions(),
            seasonOptions = getSeasonOptions(),
            venueOptions = await getVenueOptions()
        // set options
        setOptionState({
            teamsOptions,
            seasonOptions,
            venueOptions
        })
    }

    const refreshResults = async () => {
        const res = await filterAllGames(filterState)
        setResults(res)
        console.log(res)
    }

    return (
        <div>
            <div>
                <div className="select-heading">All Games</div>
                <div className="selectlist-container">
                    <SelectList
                        attribute="Season"
                        options={optionState.seasonOptions}
                        parentSetState={(season) => { setFilterState(pr => ({ ...pr, season })) }}
                    />
                    <SelectList
                        attribute="Team"
                        options={optionState.teamsOptions}
                        parentSetState={(team) => { setFilterState(pr => ({ ...pr, team })) }}
                    />
                    <SelectList
                        attribute="Venue"
                        options={optionState.venueOptions}
                        parentSetState={(venue) => { setFilterState(pr => ({ ...pr, venue })) }}
                    />
                </div>
            </div>

            <div className="result-list">
            {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                results.map(game => (
                    <GameItem 
                        key={ uuid() }
                        date={ game.date }
                        season={ game.Season }                                                  
                        team1={ game.team1 }
                        team2={ game.team2 }
                        winner={ game.winner }
                        winByRuns={ game.win_by_runs }
                        winByWickets={ game.win_by_wickets}
                        venue={ game.venue }
                        city={ game.city }
                    />
                ))
            }
            </div>
        </div>
    )
}

export default Games
