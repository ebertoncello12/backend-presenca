import {
    Request, Response 
} from 'express'
import { StudentService } from '../Services/StudentService'

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try{ 
        const data = StudentService.getStudentById(id) //Aqui vamos chamar o service que interage com o banco para pegar o aluno do banco
    }catch(e: any){
        res.status(500).json({
            message: e || e.error 
        })
    }
}