import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors();
// The default configuration is the equivalent of:
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runCORSMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn?: Function
) {
  return new Promise((resolve, reject) => {
    // fn(req, res, (result: any) => {
    //   if (result instanceof Error) {
    //     return reject(result);
    //   }

    //   return resolve(result);
    // });
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
