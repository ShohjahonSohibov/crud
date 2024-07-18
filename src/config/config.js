import 'dotenv/config';

const dbName = process.env.DB_NAME || "crud";
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASS || "1";
const dbHost = process.env.DB_HOST || "localhost";
const dbDialect = process.env.DB_DIALECT || "postgres";
const secretKey = process.env.SECRET_KEY || "key";

export {
    dbName,
    dbUser,
    dbPassword,
    dbHost,
    dbDialect,
    secretKey
};
