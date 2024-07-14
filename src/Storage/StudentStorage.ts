
import { knexInstance } from "../Database/KnexConnection";

export const GetStudentById = {
    findById: (id: string): Promise<any> => {
        return knexInstance('students').where({ id }).first();
        // Adicione os parênteses () após first para invocar a função corretamente
    } 
}