import {GetStudentById} from '../Storage/StudentStorage'
export class StudentService {

    public static getStudentById(id: string): Promise<any> {
        
        const studentResponse =  GetStudentById.findById(id); // Aqui vamos chamar o storage

        if (!studentResponse){
            console.log('Não existe esse aluno')
        }
        return  studentResponse
        
    }

}