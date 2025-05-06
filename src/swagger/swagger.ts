import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger configuration options
 */
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Management API',
      version: '1.0.0',
      description: 'API for managing course offerings and registrations'
    },
    servers: [
      {
        url: 'http://localhost:3500',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/controllers/Users/V1/index.ts'] // Path to the API routes files
};

/**
 * Generated Swagger specification
 */
const specs = swaggerJsdoc(options);

export default specs;
