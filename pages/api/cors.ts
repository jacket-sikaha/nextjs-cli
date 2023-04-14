import type { NextApiRequest, NextApiResponse } from "next";
import { runCORSMiddleware } from "../../utils/middleware/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runCORSMiddleware(req, res);

  // Rest of the API logic
  res.json({ message: "Hello Everyone!" });
}
