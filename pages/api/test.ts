import type { NextApiRequest, NextApiResponse } from "next";
import { runCORSMiddleware } from "../../utils/middleware/cors";
import { verifyMiddleware } from "../../utils/middleware/verify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Run the middleware
    await runCORSMiddleware(req, res);
    await verifyMiddleware(req, res);
    // Rest of the API logic
    res.json({ message: "Hello Everyone!" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
}
