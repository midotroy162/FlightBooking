export const authSwagger = {
  tags: [
    {
      name: 'Auth',
      description: 'User Authentication ',
    },
  ],
  paths: {
    '/auth/users/signup': {
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
                    description: 'First name of the user',
                  },
                  lastName: {
                    type: 'string',
                    description: 'Last name of the user',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'User email address',
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'User password',
                  },
                  phone: {
                    type: 'string',
                    format: 'phone',
                    description: 'User phone',
                  },
                },
              },
            },
          },
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
    '/auth/users/login': {
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
                    description: 'User email address',
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'User password',
                  },
                },
              },
            },
          },
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
    '/auth/planes/companies/signup': {
      post: {
        summary: 'make new plane company signup',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Name of the plane company',
                    example: 'Airline Company',
                  },
                  code: {
                    type: 'string',
                    description: 'Code of the plane company',
                    example: 'AC',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Plane company email address',
                    example: 'ac@mail.com',
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'Plane company password',
                    example: 'Password@123',
                  },
                  confirmPassword: {
                    type: 'string',
                    format: 'password',
                    description: 'Confirm plane company password',
                    example: 'Password@123',
                  },
                  phone: {
                    type: 'string',
                    format: 'phone',
                    description: 'Plane company phone',
                    example: '+201022222221',
                  },
                  address: {
                    type: 'string',
                    description: 'Plane company address',
                    example: 'Cairo, Egypt',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'the new plane company created',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/PlaneCompany',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/planes/companies/login': {
      post: {
        summary: 'login plane company',
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
                    description: 'Plane company email address',
                    example: 'ac@mail.com',
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'Plane company password',
                    example: 'Password@123',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Login plane company',
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
        required: ['email', 'password'],
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
      PlaneCompany: {
        type: 'object',
        required: ['id', 'email', 'password'],
        properties: {
          id: {
            type: 'integer',
            description: 'The auto-generated id of the plane company',
          },
          email: {
            type: 'string',
            description: 'The email of the plane company',
          },
          password: {
            type: 'string',
            description: 'The password of the plane company',
          },
          name: {
            type: 'string',
            description: 'The name of the plane company',
          },
          code: {
            type: 'string',
            description: 'The code of the plane company',
          },
          phoneNumber: {
            type: 'string',
            description: 'The phone number of the plane company',
          },
          address: {
            type: 'string',
            description: 'The address of the plane company',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date the plane company was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date the plane company was last updated',
          },
        },
      },
    },
  },
};
