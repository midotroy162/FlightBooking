import express, { Express } from 'express';
import morgan from 'morgan';
import config from './config';
import routes from './routes';
import { swaggerSetup } from './swagger.config';

const app: Express = express();

app.use(morgan('dev'));

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

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
