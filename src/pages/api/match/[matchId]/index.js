import { getMatchData, updateMatchData } from "@/libs/services/match-service";
import withRequestResponseHandler from "@/libs/middleware/RequestResponseHandler";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return await getMatchData(req, res);
    case "PUT":
      return await updateMatchData(req, res);
  }
};

export default withRequestResponseHandler(handler);
