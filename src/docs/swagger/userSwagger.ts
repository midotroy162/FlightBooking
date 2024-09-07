export const userSwagger = {
  tags: [
    {
      name: 'Users',
      description: 'User management and login',
    },
  ],
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        tags: ['Users'],
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get a user by ID',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
            },
            description: 'The user ID',
          },
        ],
        responses: {
          200: {
            description: 'The user description by ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          404: {
            description: 'User not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['id', 'email', 'password'],
        properties: {
          id: {
            type: 'integer',
            description: 'The auto-generated id of the user',
          },
          email: {
            type: 'string',
            description: 'The email of the user',
          },
          password: {
            type: 'string',
            description: 'The password of the user',
          },
          firstName: {
            type: 'string',
            description: 'The first name of the user',
          },
          lastName: {
            type: 'string',
            description: 'The last name of the user',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date the user was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date the user was last updated',
          },
        },
      },
    },
  },
};
