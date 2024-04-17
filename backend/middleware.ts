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
export const loginRequired = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken: string | undefined = req.cookies["accessToken"];
  const refreshToken: string | undefined = req.cookies["refreshToken"];

  // If neither token is present, return unauthorized
  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Please Log In To View This" });
  }

  // If access token is present, verify it
  if (accessToken) {
    jwt.verify(accessToken, ACCESS_KEY, (err, decoded) => {
      if (err) {
        if (refreshToken) {
          // Instead of directly refreshing here, prompt client to refresh or redirect
          return res.status(403).json({
            error: "Forbidden: Access token expired, please refresh token",
          });
        }
        return res.status(403).json({ error: "Forbidden: Invalid token" });
      }

      req.user = decoded as JWTTokenPayload;
      next();
    });
  } else if (refreshToken) {
    // Access token is missing but refresh token is present, prompt or redirect to refresh
    return res
      .status(403)
      .json({ error: "Forbidden: Access token expired, please refresh token" });
  }
};

// Okay, I think this is helpful as a middleware function. I am using RTK query to make all of my requests to my endpoints. Can you help me set up functionality in RTK query in my api calls that will do the following:

// If the middleware function returns error: "Forbidden: Access token expired, please refresh token", then RtK query should do the following. It should make a request to my '/refresh/' endpoint
