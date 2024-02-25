import express, { Express, Request, Response, Router } from "express";
import { prisma } from "../prisma";
import { loginRequired } from "../middleware";

export const endpointsRouter: Router = express.Router();

endpointsRouter.get(
  "/protected",
  loginRequired,
  async (req: Request, res: Response) => {
    console.log("hello");
    res.json({ message: "You are authorized to view this content" });
  }
);
