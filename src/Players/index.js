
import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'
// helpers
import { filterPlayers } from '../Helpers/filters'
import {
    getBattingHandOptions, getNameStartOptions,
    getBowlingOptions, getCountryOptions
} from '../Helpers/options'
// child components 
import SelectList from '../Utils/SelectList'
import PlayerItem from './PlayerItem'


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
    const refreshResults = async () => {
        const res = await filterPlayers(filterState)
        setResults(res)
        console.log(res)
    }

    // get options for dropdown
    const getOptions = async () => {
        const nameStartOptions = getNameStartOptions(),
            battingHandOptions = await getBattingHandOptions(),
            bowlingSkillOptions = await getBowlingOptions(),
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
            <div>
                <div className="select-heading">All Players</div>
                <div className="selectlist-container">
                    <SelectList
                        attribute="Name"
                        options={optionState.nameStartOptions}
                        parentSetState={(nameStart) => { setFilterState(pr => ({ ...pr, nameStart })) }}
                    />
                    <SelectList
                        attribute="Batting Hand"
                        options={optionState.battingHandOptions}
                        parentSetState={(battingHand) => { setFilterState(pr => ({ ...pr, battingHand })) }}
                    />
                    <SelectList
                        attribute="Bowling Skill"
                        options={optionState.bowlingSkillOptions}
                        parentSetState={(bowlingSkill) => { setFilterState(pr => ({ ...pr, bowlingSkill })) }}
                    />
                    <SelectList
                        attribute="Country"
                        options={optionState.countryOptions}
                        parentSetState={(country) => { setFilterState(pr => ({ ...pr, country })) }}
                    />
                </div>
            </div>
            
            <div className="result-list">
            {
                results.map(player => (
                    <PlayerItem 
                        key={ uuid() }
                        playerName={ player.Player_Name }
                        country={ player.Country }
                        battingHand={ player.Batting_Hand }
                        bowlingSkill={ player.Bowling_Skill }
                    />
                ))
            }
            </div>
        </div>
    )
}

export default Players
