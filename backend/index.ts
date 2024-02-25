import express, { Express, Request, Response } from "express";
import { userRouter } from "./routes/users/users";
import { endpointsRouter } from "./routes/endpoints/endpoints";
import bodyParser from "body-parser";

const port = 8000;

const app: Express = express();

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/endpoints", endpointsRouter);

app.listen(port, () => {
  console.log("now Listening on port 8000...");
});
