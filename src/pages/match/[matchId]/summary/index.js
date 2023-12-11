import MatchSummary from "@/components/match-summary/MatchSummary";
import { getMatchData } from "@/libs/actions/match-action";

import React from "react";

const Page = ({ matchData }) => {
  return (
    <>
      <MatchSummary matchData={matchData} />
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
export default Page;
