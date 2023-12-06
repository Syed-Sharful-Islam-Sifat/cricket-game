import { dbConnect } from "@/config/db";
import Match from "@/models/matches";
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

  console.log({ repoResult: match });

  return match;
};

const get = async ({ matchId }) => {
  const matchData = await Match.findById(matchId);
  return matchData;
};
export const matchRepository = {
  create,
  get,
};
