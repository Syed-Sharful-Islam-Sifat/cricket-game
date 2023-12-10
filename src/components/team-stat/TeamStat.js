import styles from '../team-stat/team-stat.module.css'
const TeamStat = ({matchData,country})=>{

    const players = matchData.playerHistory.filter((player)=>player.country===country)

 return(
    <div className={styles.playerDetails}>
        <div>
            <h3>{country}</h3>
        </div>
    <table class={styles.table}>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Balls</th>
          <th>Run</th>
          <th>Wickets Taken</th>
          <th>Overs Bowled</th>
          <th>Run Given</th>
        </tr>
      </thead>
      <tbody>
       {players.map((player)=>{
        const overs = Math.floor(player.overs/6)
         const extraBall = (player.overs) - (overs*6)
        return(<tr>
          <td>{player.name}</td>
          <td>{player.ballPlayed}</td>
          <td>{player.runs}</td>
          <td>{player.wickets}</td>
          <td>{overs}.{extraBall}</td>
          <td>{player.runGiven}</td>
        </tr>)
       })}

      </tbody>
    </table>
    </div>
 )

}

export default TeamStat