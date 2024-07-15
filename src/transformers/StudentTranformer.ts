
import { JsonTransformerDataExeception } from "../Exception/JsonTransformerDataExeception";
export class StudentTransformer {

    // Transformer de ingles para portugues que e oque vamos usar via tela
    public static async transformStudent(studentData: any): Promise<any> {
        try {
            const transformedStudent = {
                id: studentData.id,
                nome: studentData.name,
                matricula: studentData.registration,
                usuario_id: studentData.user_id,
                curso_id: studentData.course_id,
                idade: studentData.idade,
            };
            return transformedStudent;
        } catch (error: any) {
            throw new JsonTransformerDataExeception();
        }
    }

  
}
