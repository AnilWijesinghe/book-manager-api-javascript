const express = require('express');
const app = express();
const routes = require('./routes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Swagger Configuration
const swaggerConfiguration = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: ' Minimalist Book Manager API',
      version: '0.1.0',
      description:
        'Need a helping hand to manage your books ?' +
        'Well, you\'re in luck! This API will let you manage your books with ease! ',
    },
  },
  apis: ['src/routes/index.js', 'swagger.yaml'],
};

// Pass the swaggerConfiguration to swaggerJSDoc
const swaggerDocs = swaggerJSDoc(swaggerConfiguration);
// Serve the Swagger UI at the /api-docs endpoint and setup with
swaggerDocs;
app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs),
);

app.use(express.json());

app.use('/api/v1', routes);


module.exports = app;
