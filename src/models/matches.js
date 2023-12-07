import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({

    tossTeam:String,
    choosen:String,
    matchOver:Number,
    target:Number,
    matchResult:String,
    currentBattingTeam:String,
    currentBowlingTeam:String,
    teamA:{
        country: String,
        totalRuns:String,
        wicketsFallen:Number,
        overPlayed:Number,
        playerHistory:[
        ],
    },
    teamB:{
        country: String,
        totalRuns:String,
        wicketsFallen:Number,
        overPlayed:Number,
        playerHistory:[
        ],
    },
    currentBatsman:{
        strike:{
          id: Number
        },
        nonStrike:{
          id:Number
        },
        nextBatsman:{
          index:Number
        }
      },

      currentBowler:{
         id:Number,
         overStat:[]
      }
   
})

const Match = mongoose.models?.Match|| mongoose.model('Match',matchSchema);

export default Match;