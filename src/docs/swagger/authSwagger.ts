export const authSwagger = {
  tags: [
    {
      name: 'Auth',
      description: 'User Authentication ',
    },
  ],
  paths: {
    '/auth/signup': {
      post: {
        summary: 'make new user signup',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  firstName: {
                    type: 'string',
                    description: 'First name of the user'
                  },
                  lastName: {
                    type: 'string',
                    description: 'Last name of the user'
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'User email address'
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'User password'
                  },
                  phone: {
                    type: 'string',
                    format: 'phone',
                    description: 'User phone'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'the new user created',
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
     '/auth/login': {
      post: {
        summary: 'login user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { 
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'User email address'
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'User password'
                  },
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Login user',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/login',
                  },
                },
              },
            },
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
          accessToken: {
            type: 'string',
            description: 'access token for user',
          },
        },
      },
      login: {
        type: 'object',
        required: [ 'email', 'password'],
        properties: {
          
          email: {
            type: 'string',
            description: 'The email of the user',
          },
          password: {
            type: 'string',
            description: 'The password of the user',
          },
        },
      },
    },
  },
};
