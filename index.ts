import express, { Express, Request, Response } from "express";
import { userRouter } from "./routes/users";

const port = 8000;

const app: Express = express();

app.use("/users", userRouter);

app.listen(port, () => {
  console.log("now Listening on port 8000...");
});
