import express, { Express, Request, Response } from "express";
import { userRouter } from "./routes/users/users";
import { endpointsRouter } from "./routes/endpoints/endpoints";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = 8000;

export const app: Express = express();

const corsOptions = {
  origin: "http://ec2-54-163-65-78.compute-1.amazonaws.com",
  credentials: true, // Needed for cookies, authorization headers with HTTPS
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/endpoints", endpointsRouter);

app.listen(port, () => {
  console.log("now Listening on port 8000...");
});
