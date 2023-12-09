import { getMatchData } from "@/libs/services/match-service";
import React from "react";
import styles from "../game-play/game-play.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { players } from "@/libs/data";
import {
  updateMatch,
  updatePlayerData,
  updateRun,
} from "@/libs/actions/match-action";
import Link from "next/link";
const GamePlay = ({ data }) => {
  console.log("data on GamePlay", data);
  const [batTeam, setBatTeam] = useState(data.currentBattingTeam.country);
  const [bowlTeam, setBowlTeam] = useState(data?.currentBowlingTeam.country);
  const [newInnings, setNewInnings] = useState(false);
  const [battingTeamScores, setBattingTeamScores] = useState({
    ...data.currentBattingTeam,
  });
  const [oversPlayed, setOverslPlayed] = useState(Math.floor(data.currentBattingTeam.oversPlayed / 6));
  const [wicketsFallen, setWicketsFallen] = useState();
  const [lastBowler, setLastBowler] = useState();
  const [totalRuns, setTotalRuns] = useState();
  const [tossDecision, setTossDecision] = useState(
    `${data?.tossTeam} has won the toss and choosen ${data?.choosen} first`
  );
  const [matchOver, setMatchOver] = useState(data?.matchOver);
  const [target, setTarget] = useState(data?.target);
  const [matchResult, setMatchResult] = useState(data.matchResult ? `${data.matchResult}` : null);
  const [overStat, setOverStat] = useState([...data.currentBowler.overStat]);
  const strike_id = data.currentBatsman.strike.id;
  const nonStrike_id = data.currentBatsman.nonStrike.id;
  const bowlerId = data.currentBowler.id;
  const lastBowlerId = data?.lastBowler?.id;
  //   find opening batsman //
  const firstBatsman = data.playerHistory.find(
    (player) => player.id === strike_id
  );
  const secondBatsman = data.playerHistory.find(
    (player) => player.id === nonStrike_id
  );
  //find currentbowler
  const bowler = data.playerHistory.find((player) => player.id === bowlerId);
  const [strikeBatsman, setStrikeBatsman] = useState(firstBatsman);
  const [nonStrikeBatsman, setNonStrikeBatsman] = useState(secondBatsman);
  const [currentBowler, setCurrentBowler] = useState({ ...bowler });
  const [bowlCount, setBowlCount] = useState(data.currentBowler.overStat.length);
  console.log("bowlCount", bowlCount);
  const randomScores = [0, 1, 2, 3, 4, 6, "W", "W"];
  const handleBowling = async () => {
    const randomIndex = Math.floor(Math.random() * randomScores.length);

    const updatedData = await updateMatch({
      score: randomScores[randomIndex],
      matchId: data?._id,
      bowlCount,
      strikeId: strikeBatsman.id,
      nonStrikeId: nonStrikeBatsman.id,
      bowler_id: currentBowler?.id,
      newInnings
    });
    const { result } = updatedData.data;
    console.log('updatedData', updatedData);

    let newStrikeId = result?.currentBatsman?.strike?.id;
    let newStrikeBatter = result?.playerHistory.find((player) => player.id === newStrikeId);
    let newNonStrikeId = result?.currentBatsman?.nonStrike?.id;
    let newNonStrikeBatter = result?.playerHistory.find((player) => player.id === newNonStrikeId);

    console.log('oversplayed', result?.currentBattingTeam?.oversPlayed);
    setStrikeBatsman(newStrikeBatter);
    setNonStrikeBatsman(newNonStrikeBatter);
    setOverStat([...result?.currentBowler?.overStat]);
    setBowlCount(result?.currentBowler.overStat.length)
    //   setCurrentBowler(players[bowlTeam][result?.currentBowler?.id]);
    setLastBowler(result.lastBowler?.id);
    let new_bowlerId = result.currentBowler.id;
    let new_bowler = players[bowlTeam].find((player) => player.id === new_bowlerId);
    setCurrentBowler({ ...new_bowler })
    setBattingTeamScores({
      ...result?.currentBattingTeam
    })

    setOverslPlayed(Math.floor(result.currentBattingTeam.oversPlayed / 6));
    setMatchResult(result.matchResult)

    if ((result.currentBattingTeam.oversPlayed === data?.matchOver * 6 || result.currentBattingTeam.wicketsFallen === 10) && !target) {
      setNewInnings(true);
    }
    console.log("data", result);

  };

  const handleBowlerSelect = (e) => {
    const selectedValue = e.target.value;

    let [selectedId, selectedName] = selectedValue.split("-");
    if (selectedValue) {
      console.log("Selected ID:", selectedId);
      console.log("Selected Name:", selectedName);


      const selectedPlayer = data?.playerHistory.find(
        (player) => player.id === parseInt(selectedId)
      );
      console.log(
        "selectedPlayer",
        selectedPlayer,
        data.playerHistory,
        typeof selectedId
      );
      setCurrentBowler({ ...selectedPlayer });

    }
  };

  console.log("currenBowler", currentBowler);
  console.log('matchResult , bowlCount , currentBowler.id , newInnings , oversplayed , matchOver', matchResult, bowlCount, currentBowler.id, newInnings, oversPlayed, matchOver)
  const handleSecondInnings = async () => {
    const secondInningsData = await updateMatch({ matchId: data._id, newInnings });
    const { result } = secondInningsData.data;
    let newStrikeId = result?.currentBatsman?.strike?.id;
    let newStrikeBatter = result?.playerHistory.find((player) => player.id === newStrikeId);
    let newNonStrikeId = result?.currentBatsman?.nonStrike?.id;
    let newNonStrikeBatter = result?.playerHistory.find((player) => player.id === newNonStrikeId);
    console.log('overStat', result?.currentBowler.overStat);
    setStrikeBatsman(newStrikeBatter);
    setNonStrikeBatsman(newNonStrikeBatter);
    setOverStat([...result?.currentBowler.overStat]);
    setBowlCount(result?.currentBowler.overStat.length)
    setOverslPlayed(Math.floor(result.currentBattingTeam.oversPlayed / 6));
    setBattingTeamScores({
      ...result?.currentBattingTeam
    })
    setBatTeam(result.currentBattingTeam.country);
    setBowlTeam(result.currentBowlingTeam.country);
    setTarget(result.target);
    setCurrentBowler({})
    setNewInnings(false);
  }

  console.log('lastbowler Id', lastBowler?.id)

  return (
    <div className={styles.playContainer}>
     
        <div className={styles.bolwerSelect}>
          <select className={styles.dropdown} onChange={handleBowlerSelect}>
            <option value="">Select Bowler</option>
            {players[bowlTeam]?.map((player) => (
              <option
                key={player.id}
                value={`${player.id}-${player.name}`}
                disabled={bowlCount > 0 || lastBowler?.id || matchResult}
              >
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
                  {batTeam}: {battingTeamScores.totalRuns}/
                  {battingTeamScores.wicketsFallen} overs:
                  {oversPlayed}.{bowlCount}
                </p>

                <p className={styles.strike}>
                  {strikeBatsman?.name} : {strikeBatsman?.runs}
                </p>
                <p className={styles.strike}>
                  {nonStrikeBatsman?.name} : {nonStrikeBatsman?.runs}
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
                    disabled={matchResult || bowlCount === 6 || !currentBowler.id || newInnings || oversPlayed === matchOver * 6}
                  >
                    Bat
                  </button>
                </div>

                <div className={styles.bowl}>
                  <button
                    onClick={handleBowling}
                    disabled={matchResult || bowlCount === 6 || !currentBowler.id || newInnings || oversPlayed === matchOver * 6}
                  >
                    Bowl
                  </button>
                </div>
              </div>
              {newInnings ? (
                <div className={styles.newInnings}>
                  <button onClick={handleSecondInnings}>
                    start 2nd Innings
                  </button>
                </div>
              ) : null}
            </div>

            <div className={styles.bowlerContainer}>
              <div className={styles.bowler}>
                {currentBowler?.name ? (
                  <h4>{currentBowler.name}</h4>
                ) : (
                  !newInnings && !matchResult ? (
                    <h4>Please select a new bowler</h4>
                  ) : null
                )}

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
      
    </div>
  );
};

export default GamePlay;
