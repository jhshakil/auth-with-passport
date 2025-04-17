import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './apps/routes';
import globalErrorHandler from './apps/middlewares/globalErrorHandler';
import notFound from './apps/middlewares/notFound';
import { globalRateLimiter } from './apps/middlewares/rateLimiter';

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);
app.use(globalRateLimiter);

// application routes
app.use('/', router);

app.get('/', (req: Request, res: Response) => {
  const name = 'Hello World!';
  res.send(name);
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
