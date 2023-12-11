import GamePlay from "@/components/game-play/GamePlay";
import { getMatchData } from "@/libs/actions/match-action";
import React from "react";

const Play = ({ matchData }) => {
  return (
    <>
      <GamePlay data={matchData} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { matchId } = context.params;
  const match = await getMatchData({ matchId });
  let matchData = match.data.result;

  return {
    props: { matchData },
  };
}

export default Play;
