import type { NextApiRequest, NextApiResponse } from "next";
import { runCORSMiddleware } from "../../utils/middleware/cors";
import { getFileList } from "../../utils/mongodb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runCORSMiddleware(req, res); //一定要放在第一位，不然就不允许跨域请求了
  if (req.method !== "POST") {
    res.status(400).json({ message: "请求方法method不当" });
    return;
  }

  const data = (await getFileList()).map((obj) => ({
    id: obj._id,
    size: obj.size,
    filename: obj.newFilename,
    originalname: obj.originalFilename,
  }));
  res.status(200).json(data);
}
