import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from '.'
import { knexTestConnection } from './Database/KnexConnection'
import cors from 'cors'
import StudentRoute from './routes/Student/Router/StudentRouter'
import LoggerMiddleware from './Middleware/LoggerMiddeware'
import { ResourceNotFoundExeception } from './Exception/ResourceNotFoundExeception'
import UserRoute from './routes/Login/User/Router/UserRouter'
dotenv.config();
// Chamar a conexao com o banco na aplicação do servidor
const app = express()

const PORT = 3000
knexTestConnection()
app.use(bodyParser.json());

app.use(LoggerMiddleware)
app.use('/api', route);
app.use('/api/student', StudentRoute);
app.use('/api/login', UserRoute)
app.use(cors())

app.use((req, res)=>{
   throw new ResourceNotFoundExeception('Rota nao encontrada');
})

app.listen(PORT, ()=> {
    console.log('Servidor rodando na porta' + PORT);
})
export default app;