import Match from "@/models/matches";
import { matchRepository } from "../repositories/match-repository";

export const createMatch = async (req, res) => {
  const {
    teamA,
    teamB,
    matchOver,
    batFirst,
    batSecond,
    strikeBatsman,
    nonStrikeBatsman,
    tossTeam,
    choosen,
  } = req.body;
  console.log(
    "strikeBatsman and nonStrikeBatsman",
    strikeBatsman,
    nonStrikeBatsman
  );
  try {
    const matchCreated = matchRepository.create({
      firstTeam: teamA,
      secondTeam: teamB,
      tossTeam,
      matchOver,
      choosen,
      batFirst,
      batSecond,
      strikeBatsman,
      nonStrikeBatsman,
    });
    console.log({ serResult: matchCreated });
    return matchCreated;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
export const getMatchData = async (req, res) => {
  const { matchId } = req.query;
  try {
    const matchData = matchRepository.get({ matchId });
    return matchData;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
export const updateMatchData = async (req, res) => {
  const { matchId } = req.query;
  const { score, bowlCount , strikeId,bowler_id,nonStrikeId} = req.body;
  console.log("matchId on updateMatchData", matchId, score);

  console.log('bowlerId on updateMatchData',bowler_id)
  try {
    let matchData = await matchRepository.get({ matchId });
    console.log("strikeId", strikeId);
    // update player runs and wickets;
    matchData = await matchRepository.updatePlayer({
      score,
      strikeId,
      matchId,
      bowler_id
    });

    console.log("matchData", matchData);
    ///       update currentBatting Team Scores
    matchData.currentBattingTeam.totalRuns += score === "W" ? 0 : score;
    matchData.currentBattingTeam.oversPlayed += 1;
    matchData.currentBattingTeam.wicketsFallen += score === "W" ? 1 : 0;
    // update current bowler
    matchData.currentBowler.id = bowler_id;
    matchData.currentBowler.overStat.push(score);
     // change the strike
    if((score!=='W'&&score%2&&bowlCount<6)||(score%2==0||score==='W'&&bowlCount===6)){
      let strikeId = matchData.currentBatsman.strike.id;
      matchData.currentBatsman.strike.id = matchData.currentBatsman.nonStrike.id;
      matchData.currentBatsman.nonStrike.id = strikeId;
      
    }
    await matchData.save();
    return matchData;
  } catch (error) {
    throw new Error(error);
  }
};
