import { dbConnect } from "@/config/db";
import Match from "@/models/matches";
import { players } from "../data";
const create = async ({
  firstTeam,
  secondTeam,
  matchOver,
  tossTeam,
  choosen,
}) => {
  const match = await Match.create({
    tossTeam,
    choosen,
    matchOver,
    teamA: {
      country: firstTeam,
    },
    teamB: {
      country: secondTeam,
    },
  });

  await match.teamA.playerHistory.push(...players[firstTeam])
  await match.teamB.playerHistory.push(...players[secondTeam])
  await match.save();
  console.log({ repoResult: match ,firstTeam,secondTeam});

  return match;
};

const get = async ({ matchId }) => {
  const matchData = await Match.findById(matchId);
  return matchData;
};
export const update = async ({batsman,bowler,score,matchId}) => {
  console.log('batsman bowler score matchId',batsman,bowler,score,matchId,batTeam,bowlTeam);
  const matchData = await Match.findById(matchId);
  console.log('matchData on update',matchData);
  return matchData;
};
export const matchRepository = {
  create,
  get,
  update
};
