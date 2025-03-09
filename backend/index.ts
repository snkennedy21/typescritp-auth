import express, { Express, Request, Response } from 'express';
import { userRouter } from './routes/users/users';
import { commentsRouter } from './routes/comments/comments';
import { endpointsRouter } from './routes/endpoints/endpoints';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const port = 8000;

export const app: Express = express();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS as string;

const corsOptions = {
	origin: ALLOWED_ORIGINS,
	credentials: true, // Needed for cookies, authorization headers with HTTPS
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(function (req: Request, res: Response, next) {
	res.header('Content-Type', 'application/json;charset=UTF-8');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/endpoints', endpointsRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
	console.log('now Listening on port 8000...');
});
