import { Sequelize } from 'sequelize';
import { dbHost, dbName, dbPassword, dbUser, dbDialect } from '../config/config.js';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

export default sequelize;
