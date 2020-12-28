import React, { useState, useEffect } from 'react'
// helpers 
import { filterTeamGames } from '../Helpers/filters'
import { 
    getTeamsOptions, getResultOptions, getPlacesOptions 
} from '../Helpers/options'

// child components
import TeamIndex from './TeamIndex'
import TeamDetails from './TeamDetails'
import SelectList from '../Utils/SelectList'


const Teams = () => {

    const initOptionState = {
        teamsOptions: [], 
        placeOptions: [], 
        tossOptions: [], 
        resultOptions: []
    }
    const initFilterState = {
        team: "None",
        place: 'All',
        tossResult: 'All',
        gameResult: 'All'
    }
    
    // states 
    const [optionsState, setOptionsState] = useState(initOptionState)
    const [filterState, setFilterState] = useState(initFilterState)
    const [results, setResults] = useState([])

    // setOptions
    useEffect(() => {
        getOptions()
    }, [])

    // refresh results
    useEffect(() => {
        refreshResults()
    }, [filterState])

     // refresh results
    const refreshResults = async() => {
        const res = await filterTeamGames(filterState)
        setResults(res)
        console.log(res)
    }

    // set options for dropdown
    const getOptions = async() => {
        const teamsOptions = await getTeamsOptions(),
        tossOptions = getResultOptions(),
        resultOptions = getResultOptions(),
        placeOptions = getPlacesOptions()

        setOptionsState({
            teamsOptions,
            placeOptions,
            tossOptions,
            resultOptions
        })
    }
    
    return (
        <div>
            <TeamDetails team={filterState.team} />
            <TeamIndex 
                teams={ optionsState.teamsOptions }
                parentSetState={(team) => { setFilterState(pr => ({...pr, team})) }} 
            />
            <SelectList 
                options={ optionsState.placeOptions }
                parentSetState={(place) => { setFilterState(pr => ({...pr, place})) }} 
            />
            <SelectList 
                options={ optionsState.tossOptions }
                parentSetState={(tossResult) => { setFilterState(pr => ({...pr, tossResult})) }}
            />
            <SelectList 
                options={ optionsState.resultOptions }
                parentSetState={(gameResult) => { setFilterState(pr => ({...pr, gameResult})) }}
            />
            {/* results here */}
        </div>
    )
}

export default Teams
