import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { paths, schemas, tags } from './docs/swagger';

export const swaggerSetup = (app: Express) => {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description:
          'This is a simple CRUD API application made with Express and documented with Swagger',
        contact: {
          name: 'Flight Booking',
          email: 'flight_booking@mail.com',
        },
        servers: [
          {
            urL: 'http://localhost:3000',
            description: 'Local server',
          },
        ],
      },
      paths,
      tags,
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas,
      },
    },
    apis: ['./src/*.ts', './src/routes/*.ts', './src/routes/**/*.ts'],
  };
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
