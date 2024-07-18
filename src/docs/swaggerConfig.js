import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express JWT Products API',
            version: '1.0.0',
            description: 'A RESTful API with CRUD operations and JWT authentication'
        },
        components: {
            securitySchemes: {
                jwtAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
        // No global security applied here
    },
    apis: [join(__dirname, '../routes/*.js')]
};

const specs = swaggerJsdoc(options);

export default specs;
