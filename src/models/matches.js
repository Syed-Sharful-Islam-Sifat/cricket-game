import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({

    tossTeam:String,
    choosen:String,
    matchOver:Number,
    target:Number,
    teamA:{
        country: String,
        totalRuns:String,
        wicketsFallen:Number,
        overPlayed:Number,
        playerHistory:[
        ]
    },
    teamB:{
        country: String,
        totalRuns:String,
        wicketsFallen:Number,
        overPlayed:Number,
        playerHistory:[

        ]
    }
   
})

const Match = mongoose.models?.Match|| mongoose.model('Match',matchSchema);

export default Match;