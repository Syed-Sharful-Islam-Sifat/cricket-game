import { getMatchData } from "@/libs/services/match-service";
import withRequestResponseHandler from "@/libs/middleware/RequestResponseHandler";

const handler = async (req,res)=>{
    if(req.method==='GET'){
        return await getMatchData(req,res);
    }
}

export default withRequestResponseHandler(handler);