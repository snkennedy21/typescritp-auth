import express, { Request, Response, Router } from "express";
import { loginRequired } from "../../middleware";

export const endpointsRouter: Router = express.Router();

endpointsRouter.get(
  "/protected",
  loginRequired,
  async (req: Request, res: Response) => {
    res.json({ message: "You are authorized to view this content" });
  }
);
