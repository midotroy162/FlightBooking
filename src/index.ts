import express, { Express } from 'express';
import morgan from 'morgan';
import config from './config';
import ApiError from './helper/apiError';
import globalError from './middlewares/errorMiddleware';
import routes from './routes';
import { swaggerSetup } from './swagger.config';

const app: Express = express();

app.use(morgan('dev'));

// Middleware to parse JSON bodies
app.use(express.json());

swaggerSetup(app);

/**
 * @swagger
 *
 * /:
 *   get:
 *     summary: Get a greeting message
 *     description: Returns a greeting message to indicate that the API is up and running.
 *     responses:
 *       '200':
 *         description: A successful response with the greeting message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The greeting message.
 *                   example: Hello, world!
 */
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});
app.use('/', routes);
// Error handling
app.all("*", (req, res, next) => {
  // create error and send it to error handling middleware
  // const err = new Error("cant find this route:"+ req.originalUrl);
  // next(err.message);
  next(new ApiError(`cant find this route:${req.originalUrl}`, 400));
});
//globle error inside express
app.use(globalError);


app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
