import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
  const authHeader: string | undefined = req.headers["authorization"];
  const token: string | undefined = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    // If token is valid, attach the decoded payload to the request object
    req.user = decoded as JWTTokenPayload;
    next();
  });
};
