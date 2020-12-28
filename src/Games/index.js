import React, { useEffect, useState } from 'react'
// helpers
import { filterAllGames } from '../Helpers/filters'
import {
    getVenueOptions, getSeasonOptions, getTeamsOptions
} from '../Helpers/options'

// child components 
import SelectList from '../Utils/SelectList'

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
    const getOptions = async() => {
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

    const refreshResults = async() => {
        const res = await filterAllGames(filterState)
        setResults(res)
        console.log(res)
    }
    
    return (
        <div>
            <SelectList 
                options={ optionState.seasonOptions }
                parentSetState={(season) => { setFilterState(pr => ({...pr, season})) }} 
            />
            <SelectList 
                options={ optionState.teamsOptions }
                parentSetState={(team) => { setFilterState(pr => ({...pr, team})) }}
            />
            <SelectList 
                options={ optionState.venueOptions }
                parentSetState={(venue) => { setFilterState(pr => ({...pr, venue})) }}
            />
        </div>
    )
}

export default Games
