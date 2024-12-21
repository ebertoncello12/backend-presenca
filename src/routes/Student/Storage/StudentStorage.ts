import { knexInstance } from "../../../Database/KnexConnection";
import { generateRandomQRCode } from "../../../Helper/GenerateQrCodeHelper";
import nodemailer from 'nodemailer';

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
    
          
            const subjects = await knexInstance<any>('subjects')
                .where({ course_id: course.id })
                .select('id', 'name', 'code');
    
            const subjectIds = subjects.map((subject) => subject.id);
    
            
            for (const subject of subjects) {
               
                const classes = await knexInstance<any>('classes')
                    .where({ subject_id: subject.id })
                    .select('id', 'date', 'semester_id', 'duration', 'classroom', 'typeClass', 'startTimeClass');
    
                let totalClasses = classes.length;
                let attendedClasses = 0;
    
              
                for (const classItem of classes) {
                    const attendance = await knexInstance<any>('attendance')
                        .where({ class_id: classItem.id, student_id: id })
                        .first();
    
                    
                    if (attendance) {
                        classItem.attendance = true;
                        attendedClasses++;
                    } else {
                        classItem.attendance = false;
                    }
                }
    
              
                const attendancePercentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
    
             
                subject.classes = classes;
                subject.attendancePercentage = attendancePercentage;
            }
    
        
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

    public async postCreateAttendanceAttemptService(attendanceAttemptObj: any): Promise<void> {
        // Verificar quantos registros com o mesmo student_id existem na tabela
        const existingAttempts = await knexInstance<any>('attendance_attempts')
            .where('student_id', attendanceAttemptObj.student_id);


        if (Array.isArray(attendanceAttemptObj.attemptFace)) {
            attendanceAttemptObj.attemptFace = JSON.stringify(attendanceAttemptObj.attemptFace);
        }

        try {
            await knexInstance<any>('attendance_attempts').insert(attendanceAttemptObj);
        } catch (e: any) {
            console.error(`Error inserting into attendance_attempts: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }


    public async sendEmail(mailOptions: { to: string, subject: string, html: string }) {
        console.log('disparou o email')
        // Configuração do transportador de email (ajuste com seu serviço)
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // Ou qualquer serviço de sua escolha
            auth: {
                user: 'enzzoferrariberto@gmail.com',  // Substitua pelo seu e-mail
                pass: 'epzv etgt qajo tgjh'    // Substitua pela sua senha
            }
        });

        // Enviar o e-mail
        await transporter.sendMail({
            from: 'enzzoferrariberto@gmail.com',  // Remetente
            ...mailOptions // Desestrutura o objeto e passa as opções como 'to', 'subject', e 'html'
        });
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
