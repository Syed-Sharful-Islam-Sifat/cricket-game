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
  const [battingTeamScores, setBattingTeamScores] = useState({
    ...data.currentBattingTeam,
  });
  const [wicketsFallen, setWicketsFallen] = useState();
  const [lastBowler, setLastBowler] = useState();
  const [totalRuns, setTotalRuns] = useState();
  const [tossDecision, setTossDecision] = useState(
    `${data?.tossTeam} has won the toss and choosen ${data?.choosen} first`
  );
  const [matchOver, setMatchOver] = useState(data?.matchOver);
  const [target, setTarget] = useState(null);
  const [matchResult, setMatchResult] = useState(`${data.matchResult}`);
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
  const [bowlCount, setBowlCount] = useState(0);
  console.log("bowlCount", bowlCount);
  const randomScores = [0, 1, 2, 3, 4, 6, "W"];
  const handleBowling = async () => {
    const randomIndex = Math.floor(Math.random() * randomScores.length);

    if (typeof randomScores[randomIndex] === "number") {
      const updatedData = await updateMatch({
        score: randomScores[randomIndex],
        matchId: data?._id,
        bowlCount,
        strikeId: strikeBatsman.id,
        nonStrikeId: nonStrikeBatsman.id,
        bowler_id: currentBowler?.id,
      });

    
      console.log("data", updatedData);
    } else {
    }
  };

  const handleBowlerSelect = (e) => {
    const selectedValue = e.target.value;

    let [selectedId, selectedName] = selectedValue.split("-");
    if (selectedValue) {
      console.log("Selected ID:", selectedId);
      console.log("Selected Name:", selectedName);

      if (currentBowler?.id) {
      } else {
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
    }
  };

  console.log("currenBowler", currentBowler);

  return (
    <div className={styles.playContainer}>
      <div className={styles.bowlerSelectAndScore}>
        <div className={styles.bolwerSelect}>
          <select className={styles.dropdown} onChange={handleBowlerSelect}>
            <option value="">Select Bowler</option>
            {players[bowlTeam]?.map((player) => (
              <option
                key={player.id}
                value={`${player.id}-${player.name}`}
                disabled={bowlCount > 0}
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
                  {battingTeamScores.oversPlayed}.{bowlCount}
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
                    //disabled={matchResult !== null|| bowlCount === 6 || !currentBowler.bowler.id}
                  >
                    Bat
                  </button>
                </div>

                <div className={styles.bowl}>
                  <button
                    onClick={handleBowling}
                    //  disabled={matchResult !== null || bowlCount === 6 || !currentBowler.bowler.id}
                  >
                    Bowl
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.bowlerContainer}>
              <div className={styles.bowler}>
                <h4>{currentBowler?.name}</h4>
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
    </div>
  );
};

export default GamePlay;
