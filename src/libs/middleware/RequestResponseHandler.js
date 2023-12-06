import { dbConnect } from "@/config/db";

export default (handler) => {
  return async (req, res) => {
    try {
      await dbConnect();
      const response = await handler(req, res);
      const statusCode = res.statusCode || 200;

      res.status(statusCode).send({
        type: "RESULT",
        message: res.message || "OK",
        result: response,
        error: null,
      });
    } catch (error) {
      if (error.statusCode) {
        res.statusCode = error.statusCode;
      }

      const statusCode = res.statusCode || 500;

      res.status(statusCode).send({
        type: "ERROR",
        message: res.message,
        result: null,
        error: error.stack,
      });
    }
  };
};
