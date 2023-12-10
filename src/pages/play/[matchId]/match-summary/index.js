import MatchSummary from '@/components/match-summary/MatchSummary'
import { getMatchData } from '@/libs/actions/match-action';

import React from 'react'

const Page = ({matchData}) => {
  return (
   <>
     <MatchSummary matchData = {matchData}/>
   </>
  )
}
export async function getServerSideProps(context){
    try{
        const {matchId} = context.params;

        console.log('context.params',context.params)
        const match = await getMatchData({matchId})
        let matchData = match.data.result
        console.log('matchData',matchData,match.data.result)
        return{
           props:{matchData}
        }

    }catch(error){
        return {
            props: { matchData: null }, // Handle the error by providing a default value
          };
    }
}
export default Page
