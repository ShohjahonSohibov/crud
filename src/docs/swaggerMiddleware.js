import swaggerUi from 'swagger-ui-express';
import specs from './swaggerConfig.js';

export default (app) => {
    if (typeof app.use !== 'function') {
        throw new TypeError('The provided `app` is not an Express application');
    }
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
