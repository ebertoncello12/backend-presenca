import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes'
import { knexTestConnection } from './Database/KnexConnection'
dotenv.config();
// Chamar a conexao com o banco na aplicação do servidor
const app = express()
app.use('/', route);
app.use(bodyParser.json());

knexTestConnection()
export default app;