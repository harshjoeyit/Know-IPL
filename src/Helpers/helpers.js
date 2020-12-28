
import { csv  } from 'd3'
// data files
import teamsDataFile from '../data/teamwise_home_and_away.csv'
import gamesDataFile from '../data/matches.csv'
import statsDataFile from '../data/most_runs_average_strikerate.csv'
import playerDataFile from '../data/Players.csv'
import teamNamesDataFile from '../data/teams.csv'

/*
    Data: File -> JSON
*/

export const getTeamsData = async()  => {
    return await csv(teamsDataFile)
}

export const getGamesData = async() =>  {
    return await csv(gamesDataFile)
}

export const getStatsData = async() => {
    return await csv(statsDataFile)
}

export const getPlayersData = async() => {
    return await csv(playerDataFile)
}

export const getTeamNamesData = async() => {
    return await csv(teamNamesDataFile)
}

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


/* 
    custom compare functions 
*/

export const byTotalRuns = (lhs, rhs) => {
    return (parseInt(lhs.total_runs) < parseInt(rhs.total_runs)) ? 1: -1
}

export const byNumberOfBalls = (lhs, rhs) => {
    return (parseInt(lhs.numberofballs) < parseInt(rhs.numberofballs)) ? 1: -1
}

export const byAverage = (lhs, rhs) => {
    return (parseInt(lhs.average) < parseInt(rhs.average)) ? 1: -1
}

export const byStrikeRate = (lhs, rhs) => {
    return (parseInt(lhs.strikerate) < parseInt(rhs.strikerate)) ? 1: -1
}

export const byName = (lhs, rhs) => {
    return lhs.value < rhs.value ? -1 : 1
}


/* 
    Filter for Teams Page 
*/

export const filterTeamGames = async ({team, place, tossResult, gameResult}) => {
    // TODO: Add a field for 'Season'
    const gamesData = await getGamesData()

    return gamesData.filter(game => {
        if (place === "Home") {
            return game.team1 === team
        }
        else if(place === "Away") {
            return game.team2 === team
        }
        // only those matches where 'team' played
        return (game.team1 === team || game.team2 === team)
    })
    .filter(game => {
        if(tossResult === "Won") {
            return game.toss_winner === team
        }
        else if(tossResult === "Lost") {
            return game.toss_winner !== team
        }
        return true
    })
    .filter(game => {
        if(gameResult === "Won") {
            return game.winner === team
        } 
        else if(gameResult === "Lost") {
            return game.winner !== team
        }
        return true
    })
}


/* 
    Filter for Games page
*/

export const filterAllGames = async ({season, venue, team}) => {

    let gamesData = await getGamesData()

    return gamesData.filter(game => {
        if(season === 'All') return true
        return (`IPL-${season}` === game.Season)
    })
    .filter(game => {
        if(team === 'All') return true
        return (game.team1 === team || game.team2 === team)
    })
    .filter(game => {
        if(venue === 'All') return true
        return (game.venue === venue)
    })
}


/* 
    Filter for players 
*/

export const filterPlayers = async ({nameStart, battingHand, bowlingSkill, country}) => {

    let playersData = await getPlayersData()

    return playersData.filter(player => {
        if(nameStart === 'All') return true
        return (player.Player_Name.charAt(0) === nameStart)
    })
    .filter(player => {
        if(battingHand === 'All') return true
        return (player.Batting_Hand === battingHand)
    })
    .filter(player => {
        if(bowlingSkill === 'All')  return true
        return (player.Bowling_Skill === bowlingSkill)
    })
    .filter(player => {
        if(country === 'All') return true
        return (player.Country === country)
    })

}