// knexfile.js
require('dotenv').config();

const knexFile = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '77243264',
        database: process.env.DB_NAME || 'presenca',
    },
    migrations: {
        directory: 'migrations', 
    },
};

export default knexFile

