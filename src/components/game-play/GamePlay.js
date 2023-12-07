import { getMatchData, updateMatchData } from "@/libs/services/match-service";
import React from "react";
import styles from "../game-play/game-play.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { players } from "@/libs/data";
import { updatePlayerData } from "@/libs/actions/match-action";
const GamePlay = ({ data }) => {

  console.log('data on GamePlay', data);
  const [batTeam, setBatTeam] = useState(data?.currentBattingTeam);
  const [bowlTeam, setBowlTeam] = useState(data?.currentBowlingTeam);
  const [strikeBatsman, setStrikeBatsman] = useState()
  const [nonStrikeBatsman, setNonStrikeBatsman] = useState()
  const [currentBowler, setCurrentBowler] = useState();
  const strike_id = data.currentBatsman.strike.id;
  const nonStrike_id = data.currentBatsman.nonStrike.id;
  
  if (batTeam === data.teamA.country) {
    const firstBatsman = data.teamA.playerHistory.find((player) => player.id === strike_id);
    const secondBatsman = data.teamA.playerHistory.find((player) => player.id === nonStrike_id);
    if(data?.currentbowler?.id){

    }
    setStrikeBatsman(firstBatsman);
    setNonStrikeBatsman(secondBatsman);
  } else {
    const firstBatsman = data.teamB.playerHistory.find((player) => player.id === strike_id);
    const secondBatsman = data.teamB.playerHistory.find((player) => player.id === nonStrike_id);
    setStrikeBatsman(firstBatsman);
    setNonStrikeBatsman(secondBatsman);
  }
  const handleBowling = async () => {
    const randomIndex = Math.floor(Math.random() * randomScores.length);
    console.log("on handleBowling", randomScores[randomIndex]);
    setOverStat((prevOverStat) => [...prevOverStat, randomScores[randomIndex]]);

    setScore(randomScores[randomIndex]);

    if (typeof randomScores[randomIndex] === "number") {
      setTotalRuns(totalRuns + randomScores[randomIndex]);
    }
    if (
      typeof randomScores[randomIndex] === "number" ||
      randomScores[randomIndex] === "W"
    ) {
      setBowlCount(bowlCount + 1);
    }

    if (randomScores[randomIndex] === "W") {
      setWickets(wickets + 1);
    }

    const matchData = await updatePlayerData({ batsman: currentBatsman, bowler: currentBowler, score: randomScores[randomIndex], matchId: data._id, batTeam, bowlTeam })
  };

  const handleBowlerSelect = (e) => {
    const selectedValue = e.target.value;

    const [selectedId, selectedName] = selectedValue.split('-');
    if (selectedValue) {
      console.log("Selected ID:", selectedId);
      console.log("Selected Name:", selectedName);

      if (currentBowler.bowler.id) {
        setCurrentBowler({
          ...currentBowler,
          lastBowler: { ...currentBowler.bowler },
          bowler: {
            id: selectedId,
            name: selectedName
          }
        })
      } else {
        setCurrentBowler({
          ...currentBowler,
          bowler: {
            id: selectedId,
            name: selectedName
          }
        })
      }
    }
  }


  return (
    <div className={styles.playContainer}>
      {/* <div className={styles.bowlerSelectAndScore}>
        <div className={styles.bolwerSelect}>
          <select className={styles.dropdown} onChange={handleBowlerSelect}>
            <option value="">Select Bowler</option>
            {players[bowlTeam]?.map((player) => (
              <option key={player.id} value={`${player.id}-${player.name}`} disabled={bowlCount>0}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.score}>
          <div className={styles.toss}>
            {tossDecision ? <p>{tossDecision}</p> : null}
          </div>
          <div className={styles.batsman}>
            <div className={styles.scoreCard}>
              <h4>Scorecard</h4>
              <div className={styles.scoreDetails}>
                <p className={styles.totalScore}>
                  {batTeam}: {totalRuns}/{wickets} overs:{overs}.{bowlCount}
                </p>

                <p className={styles.strike}>
                  {currentBatsman?.strikeBatsman?.name} :{" "}
                  {currentBatsman?.strikeBatsman?.runs}
                </p>
                <p className={styles.strike}>
                  {currentBatsman?.nonStrikeBatsman?.name} :{" "}
                  {currentBatsman?.nonStrikeBatsman?.runs}
                </p>
              </div>
              <div className={styles.target}>
                {target ? <p>Target: {target}</p> : null}
              </div>
              <div className={styles.result}>
                {matchResult ? <p>{matchResult}</p> : null}
              </div>
              <div className={styles.batAndBowl}>
                <div className={styles.batting}>
                  <button
                    onClick={handleBowling}
                    disabled={matchResult !== null|| bowlCount === 6 || !currentBowler.bowler.id}
                  >
                    Bat
                  </button>
                </div>

                <div className={styles.bowl}>
                  <button
                    onClick={handleBowling}
                    disabled={matchResult !== null || bowlCount === 6 || !currentBowler.bowler.id}
                  >
                    Bowl
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.bowlerContainer}>
              <div className={styles.bowler}>
                <h4>{currentBowler.bowler?.name}</h4>
                <div className={styles.bowlCount}>
                  {overStat.map((stat, i) => (
                    <p key={i}>{stat}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.summaryLink}>
              {matchResult ? (
                <Link href={"/matchSummary"}>
                  <button>Match Summary</button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default GamePlay;
