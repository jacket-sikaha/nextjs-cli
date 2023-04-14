import { runCORSMiddleware } from "../../utils/middleware/cors";
import formidable from "formidable"; // 引入 formidable 模块
import { addFiles } from "../../utils/mongodb";
import { verifyMiddleware } from "../../utils/middleware/verify";

export const config = {
  api: {
    bodyParser: false,
  },
};
// Next.js 默认情况下会在 api 路由中启用 bodyParser，
// 它会自动解析请求体，这可能会导致 formidable 或其他解析库无法正常工作。
// 因此，您需要将 config.api.bodyParser 的值设置为 false，以禁用默认的 bodyParser，并使用 formidable 或其他解析库手动解析请求体。
export default async function handler(req, res) {
  // Run the middleware
  await runCORSMiddleware(req, res);
  if (req.method !== "POST") {
    res.status(400).json({ message: "请求方法method不当" });
    return;
  }
  try {
    await verifyMiddleware(req, res);
    // 使用 formidable 库解析 multipart/form-data 请求体
    const form = formidable({
      multiples: true,
      uploadDir: "./image-store",
      filename: function (name, ext, part) {
        const { originalFilename, mimetype } = part;
        return (
          Date.now() + originalFilename.slice(originalFilename.lastIndexOf("."))
        );
      },
    });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw err;
      }

      const file = files.files;
      await addFiles([file]);
      res.status(200).json({ file });
    });

    // fs.writeFileSync(filePath, req.body);
  } catch (error) {
    console.error("111error", error);
    res.status(500).json({ error: error.message });
  }
}
