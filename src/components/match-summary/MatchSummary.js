import React from 'react'
import styles from '../match-summary/match-summary.module.css'
import TeamStat from '../team-stat/TeamStat'
const MatchSummary = ({ matchData }) => {

    console.log('matchData on match Summary', matchData)
    return (
        <div className={styles.matchScoreCard}>
            {matchData.matchResult?(
                <h2>{matchData.matchResult}</h2>
            ):(
              null
            )}
            <div class={styles.twoTeamStat}>
                <TeamStat matchData={matchData} country={matchData.battingFirstTeam}/>
                <TeamStat matchData={matchData} country={matchData.battingSecondTeam}/>
            </div>

        </div>
    )
}

export default MatchSummary
