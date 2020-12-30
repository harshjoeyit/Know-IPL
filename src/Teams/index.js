import React, { useState, useEffect } from 'react'
// helpers 
import { filterTeamGames } from '../Helpers/filters'
import {
    getTeamsOptions, getResultOptions, getPlacesOptions
} from '../Helpers/options'

// child components
import TeamIndex from './TeamIndex'
import TeamDetails from './TeamDetails'
import TeamGameItem from './TeamGameItem'
import SelectList from '../Utils/SelectList'
import uuid from 'react-uuid'
import { filter } from 'd3'

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
    const refreshResults = async () => {
        const res = await filterTeamGames(filterState)
        setResults(res)
        console.log(res)
    }

    // set options for dropdown
    const getOptions = async () => {
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
            <TeamIndex
                teams={optionsState.teamsOptions}
                parentSetState={(team) => { setFilterState(pr => ({ ...pr, team })) }}
            />
            <TeamDetails team={filterState.team} />
            <div className="select-heading"> Team Matches </div>
            <div className="selectlist-container">
                <SelectList
                    attribute="Where"
                    options={optionsState.placeOptions}
                    parentSetState={(place) => { setFilterState(pr => ({ ...pr, place })) }}
                />
                <SelectList
                    attribute="Toss"
                    options={optionsState.tossOptions}
                    parentSetState={(tossResult) => { setFilterState(pr => ({ ...pr, tossResult })) }}
                />
                <SelectList
                    attribute="Result"
                    options={optionsState.resultOptions}
                    parentSetState={(gameResult) => { setFilterState(pr => ({ ...pr, gameResult })) }}
                />
            </div>
            <div className="result-list">
            {
                results.map(game => (
                    <TeamGameItem 
                        key={ uuid() }
                        date={ game.date }
                        season={ game.Season }
                        team1={game.team1}
                        team2={game.team2}
                        homeTeam={filterState.team}
                        tossWinner={ game.toss_winner }
                        tossDecision={ game.toss_decision }
                        gameWinner={ game.winner }
                        venue={ game.venue }
                        city={ game.city }
                    />
                ))
            }
            </div>
        </div>
    )
}

export default Teams
