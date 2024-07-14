import {GetStudentById} from '../Storage/StudentStorage'
export class StudentService {

    public static getStudentById(id: string): Promise<any> {

        return GetStudentById.findById(id); // Aqui vamos chamar o storage
    }

}