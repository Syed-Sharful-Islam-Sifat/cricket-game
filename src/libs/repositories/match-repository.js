import { dbConnect } from "@/config/db";
import Match from "@/models/matches";
import { players } from "../data";
const create = async ({
  firstTeam,
  secondTeam,
  matchOver,
  tossTeam,
  choosen,
  batFirst,
  batSecond,
  strikeBatsman,
  nonStrikeBatsman,
}) => {
  const match = await Match.create({
    tossTeam,
    choosen,
    matchOver,
    battingFirstTeam: batFirst,
    battingSecondTeam: batSecond,
    currentBattingTeam: {
      country: batFirst,
      totalRuns: 0,
      wicketsFallen: 0,
      oversPlayed: 0,
    },

    currentBowlingTeam: {
      country: batSecond,
    },

    currentBatsman: {
      strike: {
        id: strikeBatsman.id,
      },
      nonStrike: {
        id: nonStrikeBatsman.id,
      },
      nextBatsman: {
        index: 2,
      },
    },
  });

  await match.playerHistory.push(...players[firstTeam], ...players[secondTeam]);
  await match.save();
  return match;
};

const get = async ({ matchId }) => {
  const matchData = await Match.findById(matchId);
  return matchData;
};
export const updatePlayer = async ({ matchId, strikeId, score, bowler_id }) => {
  const matchData = await Match.findByIdAndUpdate(
    matchId,
    {
      $inc: {
        [`playerHistory.$[element].runs`]: score === "W" ? 0 : score,
        [`playerHistory.$[element].ballPlayed`]: 1,
        [`playerHistory.$[element2].runGiven`]: score === "W" ? 0 : score,
        [`playerHistory.$[element2].wickets`]: score === "W" ? 1 : 0,
        [`playerHistory.$[element2].overs`]: 1,
      },
    },
    {
      arrayFilters: [{ "element.id": strikeId }, { "element2.id": bowler_id }],
      new: true, // Return the modified document
    }
  );

  return matchData;
};

export const matchRepository = {
  create,
  get,
  updatePlayer,
};
