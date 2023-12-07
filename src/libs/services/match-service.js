import { matchRepository } from "../repositories/match-repository";

export const createMatch = async (req, res) => {
  const { teamA, teamB, matchOver, tossTeam, choosen } = req.body;
  try {
    const matchCreated = matchRepository.create({
      firstTeam:teamA,
      secondTeam:teamB,
      matchOver,
      tossTeam,
      choosen,
    });
    console.log({serResult: matchCreated})
    return matchCreated;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
export const getMatchData = async (req, res) => {
  const { matchId} = req.query;
  try {
    const matchData = matchRepository.get({matchId});
    return matchData;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
export const updateMatchData = async (req, res) => {
  const { matchId} = req.query;
  const {batsman,bowler,score,batTeam,bowlTeam} = req.body;
  try {
    const matchData = await matchRepository.get({matchId});
    console.log('matchData on updateMatchData',matchData);
    console.log('batsman bowler score',batsman,bowler,score);
    
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
 

