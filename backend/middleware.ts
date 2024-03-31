import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

interface JWTTokenPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: JWTTokenPayload;
}

const secretKey = "super_secret_access_key";

export const loginRequired = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // const authHeader: string | undefined = req.headers["authorization"];
  // const token: string | undefined = authHeader && authHeader.split(" ")[1];

  const accessToken: string | undefined = req.cookies["accessToken"];
  const refreshToken: string | undefined = req.cookies["refreshToken"];

  if (!accessToken && refreshToken) {
    return res.status(403).json({ error: "Forbidden: Access token expired" });
  }

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  jwt.verify(accessToken as string, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    // If token is valid, attach the decoded payload to the request object
    req.user = decoded as JWTTokenPayload;
    next();
  });
};
