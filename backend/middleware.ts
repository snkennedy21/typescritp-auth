import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTTokenPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: JWTTokenPayload;
}

const ACCESS_KEY = "super_secret_access_key";

// Middleware to check if the user is authenticated
export const loginRequired = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the access token and refresh token from the cookies
  const accessToken: string | undefined = req.cookies["accessToken"];
  const refreshToken: string | undefined = req.cookies["refreshToken"];

  console.log("REQUEST: ", req);

  // If the access token is not provided, but the refresh token is, then the access token has expired
  if (!accessToken && refreshToken) {
    return res.status(403).json({ error: "Forbidden: Access token expired" });
  }

  // If neither the access token nor the refresh token is provided, then the user is not authenticated
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  // Verify the access token
  jwt.verify(accessToken as string, ACCESS_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = decoded as JWTTokenPayload;
    next();
  });
};
