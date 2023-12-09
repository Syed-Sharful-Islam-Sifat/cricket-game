import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({

    tossTeam:String,
    choosen:String,
    matchOver:Number,
    target:Number,
    matchResult:String,
    battingFirstTeam:String,
    battingSecondTeam:String,
    currentBattingTeam:{
        country:String,
        totalRuns:Number,
        wicketsFallen:Number,
        oversPlayed:Number,
    },
    BattedFirstScores:{
      country:String,
      totalRuns:Number,
      wicketsFallen:Number,
      oversPlayed:Number
    },
    currentBowlingTeam:{
        country: String,
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
      },
      lastBowler:{
        id:Number
      },

      playerHistory:[

      ]
   
})

const Match = mongoose.models?.Match || mongoose.model('Match',matchSchema);

export default Match;