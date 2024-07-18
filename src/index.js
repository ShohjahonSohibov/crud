import express from 'express';
import bodyParser from 'body-parser';
import swaggerMiddleware from './docs/swaggerMiddleware.js';
import jwt from 'jsonwebtoken';
import sequelize from './util/db.js';
import routes from './routes/index.js';

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger setup
swaggerMiddleware(app); // Call the function with `app` as an argument

// Route setup
app.use('/api', routes);

// Database synchronization and server start
sequelize.sync()
    .then(() => {
        app.listen(3001, () => console.log('Server running on port 3001'));
    })
    .catch(err => console.error('Error syncing database: ' + err));

export default app;
