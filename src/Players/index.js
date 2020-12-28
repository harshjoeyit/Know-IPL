
import React, { useEffect, useState } from 'react'
// helpers
import { filterPlayers } from '../Helpers/filters'
import { 
    getBattingHandOptions, getNameStartOptions, 
    getBowlingOptions, getCountryOptions
} from '../Helpers/options'
// child components 
import SelectList from '../Utils/SelectList'


const Players = () => {

    const initOptionState = {
        nameStartOptions: [],
        battingHandOptions: [],
        bowlingSkillOptions: [],
        countryOptions: []
    }
    const initFilterState = {
        nameStart: 'All',
        battingHand: 'All',
        bowlingSkill: 'All',
        country: 'All'
    }

    // states 
    const [optionState, setOptionState] = useState(initOptionState)
    const [filterState, setFilterState] = useState(initFilterState)
    const [results, setResults] = useState([])


    useEffect(() => {
        getOptions()
    }, [])

    // refresh results
    useEffect(() => {
        refreshResults()
    }, [filterState])

     // refresh results
    const refreshResults = async() => {
        console.log('refresh results')
        console.log(filterState)
        const res = await filterPlayers(filterState)
        console.log(res)
    }

    // get options for dropdown
    const getOptions = async() => {
        const nameStartOptions = getNameStartOptions(),
        battingHandOptions = await getBattingHandOptions(),
        bowlingSkillOptions  = await getBowlingOptions(),
        countryOptions = await getCountryOptions()
        
        setOptionState({
            nameStartOptions,
            battingHandOptions,
            bowlingSkillOptions,
            countryOptions
        })
    }

    return (
        <div>
            <SelectList 
                options={ optionState.nameStartOptions }
                parentSetState={(nameStart) => { setFilterState(pr => ({...pr, nameStart})) }} 
            />
            <SelectList 
                options={ optionState.battingHandOptions }
                parentSetState={(battingHand) => { setFilterState(pr => ({...pr, battingHand})) }}
            />
            <SelectList 
                options={ optionState.bowlingSkillOptions }
                parentSetState={(bowlingSkill) => { setFilterState(pr => ({...pr, bowlingSkill})) }}
            />
            <SelectList 
                options={ optionState.countryOptions }
                parentSetState={(country) => { setFilterState(pr => ({...pr, country})) }}
            />
        </div>
    )
}

export default Players
