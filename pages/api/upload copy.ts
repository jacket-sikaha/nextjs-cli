import type { NextApiRequest, NextApiResponse } from "next";
import { runCORSMiddleware } from "../../utils/middleware/cors";
import fs from "fs";
import formidable from "formidable"; // 引入 formidable 模块
import { addFiles } from "../../utils/mongodb";

// import formidable from "formidable";
// import path from "path";
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Run the middleware
//   await runCORSMiddleware(req, res);
//   const form = new formidable.IncomingForm();
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send({ message: "Server Error" });
//     }

//     const uploadedFile = files.file;
//     const fileExtension = path.extname(uploadedFile.name);
//     const fileName = Date.now() + fileExtension;
//     const filePath = path.join(process.cwd(), "public", "uploads", fileName);

//     fs.rename(uploadedFile.path, filePath, (err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send({ message: "Server Error" });
//       }

//       res.status(200).send({ message: "File uploaded successfully" });
//     });
//   });
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "请求方法method不当" });
    return;
  }
  try {
    // Run the middleware
    const filePath = process.cwd() + `/image-store/${123}.jpg`;
    await runCORSMiddleware(req, res);
    // console.log("req.body", req);
    // console.log("req.qweqe", req.body);
    const form = formidable({
      multiples: true,
      uploadDir: process.cwd() + "/image-store",
    });
    // console.log("form", form);
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        throw err;
      }

      const { title } = fields;
      const file = files.image;
      console.log(2222);
      console.log("fields", fields);
      console.log("files", files);
    });

    fs.writeFileSync(filePath, req.body);
    // await runMulter(req, res);
    // if (!req.files) {
    //   throw new Error("Files Invalid");
    // }
    // await addFiles(req.files);
    res.status(200).json({ message: "req" });
  } catch (error) {
    console.log("111error", error);
    res.status(500).json({ error: error.message });
  }
}
