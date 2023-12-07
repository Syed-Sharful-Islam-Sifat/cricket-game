import { getMatchData, updateMatchData } from "@/libs/services/match-service";
import withRequestResponseHandler from "@/libs/middleware/RequestResponseHandler";

const handler = async (req,res)=>{
    if(req.method==='GET'){
        return await getMatchData(req,res);
    }

    if(req.method==='PUT'){
       return await updateMatchData(req,res); 
    }

    if(req.method==='POST'){
        
    }
}

export default withRequestResponseHandler(handler);