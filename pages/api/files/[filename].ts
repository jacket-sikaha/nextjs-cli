import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { runCORSMiddleware } from "../../../utils/middleware/cors";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runCORSMiddleware(req, res);
    const { filename } = req.query;
    const filePath = process.cwd() + `/image-store/${filename}`;
    const file = fs.readFileSync(filePath);
    // res.setHeader("Content-type", "application/octet-stream");
    res.setHeader(
      "Content-type",
      "image/" + filename.slice(filename.lastIndexOf("."))
    );

    //！！！响应头里不允许带中文
    res.setHeader("Content-Disposition", `attachment;filename=${filename}`);
    res.status(200).send(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
