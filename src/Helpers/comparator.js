
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

