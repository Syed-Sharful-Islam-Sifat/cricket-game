import Match from "@/models/matches";
import { matchRepository } from "../repositories/match-repository";
import { players } from "../data";

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
  const { score, bowlCount, strikeId, bowler_id, nonStrikeId, newInnings } = req.body;
  console.log("matchId on updateMatchData", matchId, score);

  console.log('bowlerId on updateMatchData', bowler_id)
  try {
    switch (newInnings) {
      case false:

        // update player runs and wickets;
        let matchData = await matchRepository.updatePlayer({
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
        if (bowlCount < 5) {
          matchData.currentBowler.id = bowler_id;
          matchData.currentBowler.overStat.push(score);
        }

        else {
          let currentId = matchData.currentBowler.id;
          matchData.lastBowler.id = currentId;
          matchData.currentBowler.id = null;
          matchData.currentBowler.overStat = [];
        }
        //newBatsman comesIn
        if (score === 'W' && matchData.currentBatsman.nextBatsman.index <= 10) {
          let nextBatsmanIndex = matchData.currentBatsman.nextBatsman.index;
          let newBatsman = players[matchData.currentBattingTeam.country][nextBatsmanIndex];
          matchData.currentBatsman.strike.id = newBatsman.id;
          matchData.currentBatsman.nextBatsman.index = nextBatsmanIndex + 1;
        }
        // change the strike
        if ((score !== 'W' && score % 2 && bowlCount < 5) || ((score % 2 == 0 || score === 'W') && bowlCount === 5)) {
          let strikeId = matchData.currentBatsman.strike.id;
          matchData.currentBatsman.strike.id = matchData.currentBatsman.nonStrike.id;
          matchData.currentBatsman.nonStrike.id = strikeId;
        }

        if (matchData.target && (matchData.currentBattingTeam.totalRuns >=matchData.target)) {
          matchData.matchResult = `${matchData.currentBattingTeam.country} has won the match by ${10 - matchData.currentBattingTeam.wicketsFallen} wickets`
        }

        else if (matchData.target && ((matchData.currentBattingTeam.oversPlayed === matchData.matchOver * 6) || (matchData.currentBattingTeam.wicketsFallen === 10))){
           
           if(matchData.target===matchData.currentBattingTeam.totalRuns){
            matchData.matchResult = `Match Drawn`
           }else{
             matchData.matchResult = `${matchData.currentBowlingTeam.country} has won the match by ${matchData.BattedFirstScores.totalRuns-matchData.currentBattingTeam.totalRuns} runs`
           }
        }

          await matchData.save();
        return matchData;
      case true:
        console.log('newInnings', newInnings)
        let data = await matchRepository.get({ matchId });
        data.target = data.currentBattingTeam.totalRuns + 1;
        data.BattedFirstScores.country = data.currentBattingTeam.country;
        data.BattedFirstScores.totalRuns = data.currentBattingTeam.totalRuns
        data.BattedFirstScores.oversPlayed = data.currentBattingTeam.oversPlayed
        data.BattedFirstScores.wicketsFallen = data.currentBattingTeam.wicketsFallen;
        data.currentBattingTeam.country = data.battingSecondTeam;
        data.currentBattingTeam.totalRuns = 0;
        data.currentBattingTeam.oversPlayed = 0;
        data.currentBattingTeam.wicketsFallen = 0;
        data.currentBatsman.strike.id = players[data.battingSecondTeam][0].id;
        data.currentBatsman.nonStrike.id = players[data.battingSecondTeam][1].id;
        data.currentBatsman.nextBatsman.index = 2;
        data.currentBowlingTeam.country = data.battingFirstTeam;
        data.currentBowler.id = null;
        data.lastBowler.id = null;
        data.currentBowler.overStat = [];
        data.lastBowler.id = null;
        await data.save();
        console.log('data on secondInnings', data)
        return data;

    }

  } catch (error) {
    throw new Error(error);
  }
};
