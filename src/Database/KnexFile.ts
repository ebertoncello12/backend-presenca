// knexfile.js
require('dotenv').config();

const knexFile = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'dev_piu',
        password: process.env.DB_PASSWORD || 'dev_piu',
        database: process.env.DB_NAME || 'dev_piu_ms_pedido',
    },
    migrations: {
        directory: 'migrations', 
    },
};

export default knexFile

