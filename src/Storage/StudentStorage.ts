import { knexInstance } from "../Database/KnexConnection";
import { generateRandomQRCode } from "../Helper/GenerateQrCodeHelper";
export class StudentStorage {
    public async findById(id: string): Promise<any> {
        try {
            // Passo 1: Encontrar o aluno
            const student = await knexInstance<any>('students').where({ id }).first();
            
            if (!student) {
                throw new Error(`Student with id ${id} not found`);
            }

            // Passo 2: Encontrar o curso do aluno
            const course = await knexInstance<any>('courses').where({ id: student.course_id }).first();

            if (!course) {
                throw new Error(`Course with id ${student.course_id} not found`);
            }

            // Passo 3: Encontrar as matérias do curso com nome e código e suas respectivas aulas
            const subjects = await knexInstance<any>('subjects')
                .where({ course_id: course.id })
                .select('id', 'name', 'code');

            // Transforma a lista de ids das matérias em um array de ids
            const subjectIds = subjects.map((subject) => subject.id);

            // Passo 4: Para cada matéria, encontrar suas classes (aulas)
            for (const subject of subjects) {
                const classes = await knexInstance<any>('classes')
                    .where({ subject_id: subject.id })
                    .select('id', 'date', 'semester_id');

                // Adiciona as classes (aulas) à matéria atual
                subject.classes = classes;
            }

            // Agora podemos adicionar as informações ao objeto do aluno
            const extendedStudent = {
                ...student,
                course,
                subjects,
            };

            return extendedStudent;
            
        } catch (e: any) {
            console.error(`Error retrieving student details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

    public async findAttendanceByStudentId(id: string): Promise<any> {
        try {
            // Passo 1: Encontrar a presença do aluno
            const student = await knexInstance<any>('attendance').where({ student_id: id });
            return student;
            
        } catch (e: any) {
            console.error(`Error retrieving student details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

   public async findQrCodeByStudentIdAndClassId(studentId: string, classId: string): Promise<any> {
        try {
            // Passo 1: Encontrar o código QR pelo student_id e class_id
            const qrCodes = await knexInstance<any>('qrcode')
                .where({ student_id: studentId, class_id: classId });
            return qrCodes;
            
        } catch (e: any) {
            console.error(`Error retrieving QR code details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

    public async findByQrCode(id: string): Promise<any> {
        try {
            // Passo 1: Encontrar o código QR pelo student_id e class_id
            const qrCodes = await knexInstance<any>('qrcode')
                .where({ id: id });
            return qrCodes;
            
        } catch (e: any) {
            console.error(`Error retrieving QR code details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

    public async findByIdClassAndStudentId(classId: string, studentId: string): Promise<any> {
        try {
            // Passo 1: Encontrar o código QR pelo student_id e class_id
            const attendance = await knexInstance<any>('attendance')
                .where({ class_id: classId, student_id: studentId }).first();
            return attendance;
            
        } catch (e: any) {
            console.error(`Error retrieving QR code details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

    public async postMarkAttendance(attendaneObj: any): Promise<any> {
        try {
            // Passo 1: Encontrar o código QR pelo student_id e class_id
            await knexInstance<any>('attendance').insert(attendaneObj);

        } catch (e: any) {
            console.error(`Error retrieving QR code details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

    public async postGenerateQrCodeStudent(qrCodeObj: any): Promise<void> {
        try {
             await knexInstance<any>('qrcode').insert(qrCodeObj);
        } catch (e: any) {
            console.error(`Error generating QR code: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }
    public async patchQrCodeStudent(id: string): Promise<void> {
        try {
            await knexInstance('qrcode').where({ id }) // Filtrar pelo ID fornecido
                .update({ used: true }); // Atualizar a coluna 'used' para true
        } catch (error: any) {
            console.error(`Erro ao atualizar código QR para aluno: ${error.message}`);
            throw error;
        }
    }
}
