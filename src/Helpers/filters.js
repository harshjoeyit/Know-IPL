
import { getGamesData, getPlayersData } from './request'

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