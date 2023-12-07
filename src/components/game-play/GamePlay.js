import { getMatchData, updateMatchData } from "@/libs/services/match-service";
import React from "react";
import styles from "../game-play/game-play.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { players } from "@/libs/data";
import { updatePlayerData } from "@/libs/actions/match-action";
const GamePlay = ({ data }) => {
  const router = useRouter();
  const teamA = data.teamA.country;
  const teamB = data.teamB.country;
  const matchOver = data.matchOver;
  const options = ["Bat", "Bowl"];
  const teams = [teamA, teamB];
  const [tossTeam, setTossTeam] = useState("");
  const [decision, setDecision] = useState("");
  const [batTeam, setBatTeam] = useState("");
  const [bowlTeam, setBowlTeam] = useState("");
  const [tossDecision, setTossDecision] = useState(
    `${data.tossTeam} has won the toss and elected to ${data.choosen} first`
  );
  const [playersTeamA, setPlayersTeamA] = useState(players[teamA]);
  const [playersTeamB, setPlayersTeamB] = useState(players[teamB]);
  const [ponitToNextBatsman, setPointToNextBatsman] = useState(2);
  const [currentBowlerIndex, setCurrentBowlerIndex] = useState(10);
  const [overs, setOvers] = useState(0);
  const [bowlCount, setBowlCount] = useState(0);
  const [target, setTarget] = useState(null);
  const [totalRuns, setTotalRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [score, setScore] = useState(null);
  const [overStat, setOverStat] = useState([]);
  const [matchResult, setMatchResult] = useState(null);
  const randomScores = [0, 1, 2, 3, 4, 6, "W"];
  const [batFirstTeam, setBatFirstTeam] = useState("");
  const [batSecondTeam, setBatSecondTeam] = useState("");

  const [currentBatsman, setCurrentBatsman] = useState({
    strikeBatsman: {},
    nonStrikeBatsman: {},
    nextBatsman: {},
  });

  const [currentBowler, setCurrentBowler] = useState({
    bowler: {

    },
    lastBowler: {},
  });

  useEffect(() => {
    
  }, []);

  function teamSwitch() {
    const newBowlTeam = batTeam;
    setBatTeam(bowlTeam);
    setBowlTeam(newBowlTeam);
    setTarget(totalRuns + 1);
    setScore(null);
    setTotalRuns(0);
    setCurrentBowlerIndex(10);
    setTotalRuns(0);
    setOverStat([]);
    setBowlCount(0);
    setOvers(0);
    setWickets(0);
    setPointToNextBatsman(2);
    setCurrentBowler({
      bowler:{

      },
      lastBowler:{

      }
    })
  }

  useEffect(() => {
    if (batTeam && bowlTeam) {
      setCurrentBatsman({
        strikeBatsman: players[batTeam][0],
        nonStrikeBatsman: players[batTeam][1],
        nextBatsman: players[batTeam][ponitToNextBatsman],
      });


    }
  }, [batTeam, bowlTeam]);

  useEffect(() => {
    if (bowlCount === 6) {
      setOverStat([]);
      setBowlCount(0);
      setOvers(overs + 1);
    }
    if (typeof score === "number") {
      setCurrentBatsman((prevBatsmanState) => {
        const strike = { ...prevBatsmanState.strikeBatsman };
        if (
          (score % 2 === 1 && bowlCount < 6) ||
          (score % 2 === 0 && bowlCount === 6)
        ) {
          strike.runs = strike.runs + score;
          console.log("score and bowlCount", score, bowlCount);
          return {
            ...prevBatsmanState,
            strikeBatsman: {
              ...prevBatsmanState.nonStrikeBatsman,
            },
            nonStrikeBatsman: {
              ...strike,
            },
          };
        }
        return {
          ...prevBatsmanState,
          strikeBatsman: {
            ...prevBatsmanState.strikeBatsman,
            runs: prevBatsmanState.strikeBatsman.runs + score,
          },
        };
      });
    }
    setScore(null);
  }, [score, bowlCount]);

  useEffect(() => {
    if (wickets > 0 && wickets <= 9) {
      setPointToNextBatsman(ponitToNextBatsman + 1);
    }
  }, [wickets]);

  useEffect(() => {
    if ((overs === matchOver || wickets === 10) && target === null) {
      teamSwitch();
    } else if (overs === matchOver || wickets === 10) {
      if (totalRuns === target - 1) {
        setMatchResult("Match Drawn");
      } else if (totalRuns < target) {
        setMatchResult(
          `${bowlTeam} has won the match by ${target - 1 - totalRuns} runs`
        );
      }
    }
  }, [overs, wickets]);

  useEffect(()=>{
    if(overs>0){
      setCurrentBowler({
        bowler:{

        },
        lastBowler:{

        }
      })
    }
  },[overs])

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
   
    const matchData = await updatePlayerData({batsman:currentBatsman,bowler:currentBowler,score:randomScores[randomIndex],matchId:data._id,batTeam,bowlTeam})
  };

  const handleBowlerSelect = (e)=>{
    const selectedValue = e.target.value;

    const [selectedId, selectedName] = selectedValue.split('-');
    if(selectedValue){
     console.log("Selected ID:", selectedId);
     console.log("Selected Name:", selectedName);

     if(currentBowler.bowler.id){
      setCurrentBowler({
        ...currentBowler,
        lastBowler:{...currentBowler.bowler},
        bowler:{
          id:selectedId,
          name:selectedName
        }
      })
     }else{
       setCurrentBowler({
        ...currentBowler,
        bowler:{
          id:selectedId,
          name:selectedName
        }
       })
     }
    }
  }

  useEffect(()=>{
    console.log('currentBowler',currentBowler)
  },[currentBowler])

  useEffect(() => {
    if (ponitToNextBatsman > 2) {
      setCurrentBatsman((prevBatsmanState) => {
        //const strike = {...prevBatsmanState.strikeBatsman};
        return {
          ...prevBatsmanState,
          strikeBatsman: {
            ...prevBatsmanState.nonStrikeBatsman,
          },
          nonStrikeBatsman: {
            ...players[batTeam][ponitToNextBatsman],
          },
        };
      });
    }
  }, [ponitToNextBatsman]);

  useEffect(() => {
    if (target < totalRuns && target !== null) {
      setMatchResult(`${batTeam} has won the match by ${10 - wickets} wickets`);
    } else if (target - 1 === totalRuns && overs === matchOver) {
      setMatchResult(`Match Drawn`);
    }
  }, [totalRuns]);

  useEffect(() => {
    if (matchResult) {
    }
  }, [matchResult]);
  return (
    <div className={styles.playContainer}>
      <div className={styles.bowlerSelectAndScore}>
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
      </div>
    </div>
  );
};

export default GamePlay;
