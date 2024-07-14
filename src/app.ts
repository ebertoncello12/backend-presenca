import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes'
import { knexTestConnection } from './Database/KnexConnection'
import cors from 'cors'
import StudentRoute from './routes/Student/StudentRouter'
dotenv.config();
// Chamar a conexao com o banco na aplicação do servidor
const app = express()

const PORT = 3000

app.use('/api', route);
app.use('/api/student', StudentRoute);
app.use(cors())
app.use(bodyParser.json());

knexTestConnection()
app.use((req, res)=>{
    res.status(404).json({
        message:'Rota não encontrada'
    })
})

app.listen(PORT, ()=> {
    console.log('Servidor rodando na porta' + PORT);
})
export default app;