import React, { useEffect, useState } from "react";
import TeamSelect from "../team-select/TeamSelect";
import styles from "../two-teams-select/twoteamSelect.module.css";
import { players } from "../../libs/data";
import { teams } from "../../libs/data";
import { useRouter } from "next/router";
import { overs } from "../../libs/data";
import Link from "next/link";
import { matchCreate } from "@/libs/actions/match-action";
const TwoTeamsSelect = () => {
  const [playersA, setPlayersA] = useState([]);
  const [playersB, setPlayersB] = useState([]);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [matchOver, setMatchOver] = useState();
  const router = useRouter();

  const handleTeamSelect = (choosenTeam, type) => {
    console.log("choosenTeam and type on handleTeamSelect", choosenTeam, type);

    if (type === "A") {
      setTeamA(choosenTeam);

      setPlayersA(teams.includes(choosenTeam) ? players[choosenTeam] : []);
    } else {
      setTeamB(choosenTeam);
      setPlayersB(teams.includes(choosenTeam) ? players[choosenTeam] : []);
    }
  };

  const handleToss = async () => {
    const randomTeam = Math.random() < 0.5 ? teamA : teamB;
    const batOrBowl = Math.random() < 0.5 ? "Bat" : "Bowl";

    let strikeBatsman, nonStrikeBatsman, batFirst, batSecond;
    if (randomTeam === teamA) {
      if (batOrBowl === "Bat") {
        strikeBatsman = players[teamA][0];
        nonStrikeBatsman = players[teamA][1];
        batFirst = teamA;
        batSecond = teamB;
      } else {
        strikeBatsman = players[teamB][0];
        nonStrikeBatsman = players[teamB][1];
        batSecond = teamA;
        batFirst = teamB;
      }
    } else {
      if (batOrBowl === "Bat") {
        strikeBatsman = players[teamB][0];
        nonStrikeBatsman = players[teamB][1];
        batFirst = teamB;
        batSecond = teamA;
      } else {
        strikeBatsman = players[teamA][0];
        nonStrikeBatsman = players[teamA][1];
        batSecond = teamB;
        batFirst = teamA;
      }
    }

    console.log(
      "strikeBatsman nonStrikeBatsman",
      strikeBatsman,
      nonStrikeBatsman,
      teamA,
      teamB,
      batFirst,
      batSecond
    );

    const match = await matchCreate({
      teamA,
      teamB,
      matchOver,
      batFirst,
      batSecond,
      strikeBatsman,
      nonStrikeBatsman,
      tossTeam: randomTeam,
      choosen: batOrBowl,
    });

    console.log("match", match.data.result);
    router.push({
      pathname: `play/${match?.data.result?._id}`,
    });
  };

  const handleOverSelect = (e) => {
    setMatchOver(e.target.value);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.team_players}>
        <div className={styles.playerListA}>
          <div className={styles.playersB}>
            {teamA ? <h4>{teamA}</h4> : <h4>Players of Team A:</h4>}
            {playersA.map((player) => (
              <h4 key={player.id}>{player.name}</h4>
            ))}
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.teamSelect}>
            <h4>Select Two Teams</h4>
            <div className={styles.teamA}>
              <TeamSelect
                team={"A"}
                opponent={teamB}
                handleTeamSelect={handleTeamSelect}
              />
            </div>

            <div className={styles.teamB}>
              <TeamSelect
                team={"B"}
                opponent={teamA}
                handleTeamSelect={handleTeamSelect}
              />
            </div>
          </div>
          <div className={styles.toss}>
            {teams.includes(teamA) && teams.includes(teamB) ? (
              <div className={styles.overandtoss}>
                <div className={styles.over}>
                  <select
                    className={styles.dropdown}
                    onChange={handleOverSelect}
                  >
                    <option value="">Select Over</option>
                    {overs.map((over) => (
                      <option key={over} value={over}>
                        {over}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.toss}>
                  <button onClick={handleToss}>toss and play</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.playerListB}>
          <div className={styles.playersA}>
            {teamB ? <h4>{teamB}</h4> : <h4>Players of TeamB:</h4>}
          </div>

          {playersB.map((player) => (
            <h4 key={player.id}>{player.name}</h4>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoTeamsSelect;
