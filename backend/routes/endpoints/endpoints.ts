import express, { Request, Response, Router } from "express";
import { loginRequired } from "../../middleware";

export const endpointsRouter: Router = express.Router();

endpointsRouter.get(
  "/protected",
  loginRequired,
  async (req: Request, res: Response) => {
    console.log("HELLO");
    res.json({
      message: "Yes, you can view this content because you are logged in",
    });
  }
);

endpointsRouter.get("/unprotected", async (req: Request, res: Response) => {
  res.json({
    message: `
      This content is not protected. 
      It doesn't really matter if you're logged in or not. 
      You will be able to view the content regardless. 
      There's nothing else interesting here
      `,
  });
});
