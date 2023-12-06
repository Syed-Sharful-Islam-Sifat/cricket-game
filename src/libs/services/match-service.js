import { matchRepository } from "../repositories/match-repository";

export const createMatch = async (req, res) => {
  const { teamA, teamB, matchOver, tossTeam, choosen } = req.body;
  try {
    const matchCreated = matchRepository.create({
      teamA,
      teamB,
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
 

