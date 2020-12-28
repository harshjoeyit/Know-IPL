
import { csv  } from 'd3'

// files
import teamsDataFile from '../data/teamwise_home_and_away.csv'
import gamesDataFile from '../data/matches.csv'
import statsDataFile from '../data/most_runs_average_strikerate.csv'
import playerDataFile from '../data/Players.csv'
// import teamNamesDataFile from '../data/teams.csv'

/*
    Data: CSV => JSON
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

// export const getTeamNamesData = async() => {
//     return await csv(teamNamesDataFile)
// }
