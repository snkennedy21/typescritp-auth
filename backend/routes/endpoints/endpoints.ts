import express, { Request, Response, Router } from "express";
import { loginRequired } from "../../middleware";

export const endpointsRouter: Router = express.Router();

endpointsRouter.get(
  "/protected",
  loginRequired,
  async (req: Request, res: Response) => {
    res.json({ message: "Yes, you can view this content" });
  }
);

endpointsRouter.get("/unprotected", async (req: Request, res: Response) => {
  res.json({ message: "This content is not protected" });
});
