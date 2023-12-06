import GamePlay from '@/components/game-play/GamePlay'
import { getMatchData } from '@/libs/actions/match-action';
import React from 'react'

const Play = ({matchData}) => {


    console.log('props on Play',matchData)
  return (
    <>
     <GamePlay data={matchData}/>
    </>
  )
}

export async function getServerSideProps(context){
    try{
        const {matchId} = context.params;
        const match = await getMatchData({matchId});
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

export default Play 