

import { byName } from './comparator'
import { 
    getTeamsData, getGamesData, getPlayersData 
} from './request'


/* 
    Options
*/

export const getTeamsOptions = async() => {
    const teamsData = await getTeamsData()
    return teamsData.map(team => ({
        id: undefined,
        value: team.team
    }))
    .sort(byName)
}

export const getResultOptions = () => (
    [
        {
            id: undefined,
            value: 'Won'
        },
        {
            id: undefined,  
            value: 'Lost'
        }
    ]
)

export const getPlacesOptions = () => (
    [
        {
            id:  undefined, 
            value: 'Home'
        },
        {
            id: undefined,
            value: 'Away'
        }
    ]
)

export const getSeasonOptions = () => {
    const seasons = []
    for(var year=2008; year<=2019; year++) {
        seasons.push({
            id: undefined, 
            value: year.toString()
        })
    }
    return seasons
} 

export const getVenueOptions = async () => {
    let games = await getGamesData()
    let venues = games.map(game => game.venue)
    venues = [...new Set(venues)].sort()

    return venues.map(venue => ({
        id: undefined,
        value: venue
    }))
}

export const getNameStartOptions = () => {
    let letters = []
    for(let i=65; i<91; i++) {
        letters.push({
            id: undefined,
            value: String.fromCharCode(i)
        })
    }
    return letters
}

export const getBattingHandOptions = async() => (
    [
        {
            id:  undefined, 
            value: 'Right_Hand'
        },
        {
            id: undefined,
            value: 'Left_Hand'
        }
    ]
)

export const getBowlingOptions = async() => {
    let players = await getPlayersData()
    let skills = players.map(player => player.Bowling_Skill)
    skills = [...new Set(skills)].sort()
    
    return skills.map(skill => ({
        id: undefined,
        value: skill
    }))
    .filter(item => item.value !== "" && item.value !== "NULL")
}

export const getCountryOptions = async() => {
    let players = await getPlayersData()
    let countries = players.map(player => player.Country)
    countries = [...new Set(countries)].sort()
    
    return countries.map(cntry => ({
        id: undefined,
        value: cntry
    }))
    .filter(item => item.value !== "")
}
