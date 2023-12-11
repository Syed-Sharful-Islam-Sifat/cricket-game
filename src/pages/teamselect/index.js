import React from "react";
import "../../components/two-teams-select/TwoTeamSelect";
import TwoTeamsSelect from "../../components/two-teams-select/TwoTeamSelect";
import { teams } from "@/libs/data";
const TeamsSelect = ({ data }) => {
  return (
    <>
      <TwoTeamsSelect teams={data} />
    </>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      data: teams,
    },
  };
};

export default TeamsSelect;
