import { createMatch } from "@/libs/services/match-service";
import withRequestResponseHandler from "@/libs/middleware/RequestResponseHandler";

const handler = async (req, res) => {
  if (req.method === "POST") {
    return await createMatch(req, res);
  }
};

export default withRequestResponseHandler(handler);
