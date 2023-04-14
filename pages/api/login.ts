import type { NextApiRequest, NextApiResponse } from "next";
import { runCORSMiddleware } from "../../utils/middleware/cors";
import jwt from "jsonwebtoken";
import { verifyMiddleware } from "../../utils/middleware/verify";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runCORSMiddleware(req, res);
  if (req.method !== "POST") {
    res.status(400).json({ message: "请求方法method不当" });
    return;
  }
  try {
    const { username, password } = req.body;
    if (
      username === process.env.database_username &&
      password === process.env.database_passwd
    ) {
      // TODO_03:在登录成功之后，调用jwt.sign()方法生成 JWT 字符串。并通过token属性发送给客户端
      // 参数1:用户的信息对象
      // 参数2:加密的秘钥
      // 参数3:配置对象，可以配置当前token的有效期
      jwt.sign(
        { username },
        process.env.jwtKey,
        { expiresIn: `${process.env.expiresIn}s` },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.status(200).send({
            message: "登陆成功",
            token,
          });
        }
      );
    } else {
      res.status(400).send({
        message: "用户名或密码错误",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
