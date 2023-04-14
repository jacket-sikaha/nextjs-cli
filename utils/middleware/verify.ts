import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
const path = ["/api/login", "/api/allFiles", /\/api\/files\/.+/];

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function verifyMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn?: Function
) {
  return new Promise((resolve, reject) => {
    const check = path.some((reg) => {
      return new RegExp(reg).test(req.url);
    });
    if (check) {
      return resolve("verify success");
    }
    const token = req.headers.authorization?.split(" ")[1];
    console.log("req", token, req.url);

    jwt.verify(token, process.env.jwtKey, function (err, decoded) {
      if (err) {
        return reject(err);
      }
      console.log(decoded); // { userId: '123' }
      return resolve(decoded);
    });
  });
}
