import { ResourceNotFoundExeception } from "../../../Exception/ResourceNotFoundExeception";
import { StudentStorage } from "../Storage/StudentStorage";
import { generateRandomQRCode } from "../../../Helper/GenerateQrCodeHelper";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from 'uuid';
import { BadRequestExeception } from "../../../Exception/BadRequestExeception";
import { CODE_ERROR_QRCODE_IS_ALEARDY_GENERATED, CODE_ERROR_QRCODE_NOT_FOUND, CODE_ERROR_QRCODE_DIFERRENT_CODE, CODE_ERROR_QRCODE_ID_DIFERRENT, CODE_ERROR_ATTENDANCE_IS_ALEARDLY_MARKED, CODE_ERROR_QRCODE_EXPIRED } from "../../../Exception/CodeErrors/CodeErrors";
import { CODE_ERROR_QRCODE_IS_USED } from "../../../Exception/CodeErrors/CodeErrors";
import qr from 'qr-image'

export class StudentService {

    private static studentStorage = new StudentStorage();

    public static async getStudentByIdService(id: string): Promise<any> {
        try {
            const studentResponse = await this.studentStorage.findById(id); // Chama o método findById do StudentStorage
            if (!studentResponse) {
                throw new ResourceNotFoundExeception('Aluno nao encontrado');
            }
            return studentResponse;
        } catch (error: any) {
            console.error(`Erro ao buscar aluno por ID: ${error.message}`);
            throw error; // Rejeita a promise com o erro capturado
        }
    }
    public static async getStudentAttendanceService(id: string): Promise<any> {
        try {
            const studentAttendanceResponse = await this.studentStorage.findAttendanceByStudentId(id); // Chama o método findById do StudentStorage
            if (!studentAttendanceResponse) {
                throw new ResourceNotFoundExeception('Presença do aluno nao encontrado');
            }
            return studentAttendanceResponse;
        } catch (error: any) {
            console.error(`Erro ao buscar aluno por ID: ${error.message}`);
            throw error; // Rejeita a promise com o erro capturado
        }
    }

    public static async postQrCodeStudentService(classId: string): Promise<any> {
        try {

            // Validar se ja existe um qr code para aula se existir travar o usuario 
          

            const qrCodeValue = generateRandomQRCode(50);
            const expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + 30);
            
            // Criando o objeto com os dados necessários
            const qrCodeObject = {
                id: uuidv4(),
                class_id: classId,
                date_expiration: expirationDate,
                created_at: new Date(), // Definindo a data de criação do código
                used: false,
                code: qrCodeValue
            };
    
            // Chamando o método adequado no studentStorage
           await this.studentStorage.postGenerateQrCodeStudent(qrCodeObject);
           return {id: qrCodeObject.id}
    
        } catch (error: any) {
            console.error(`Erro ao gerar código QR para aluno: ${error.message}`);
            throw error;
        }
    }

    public static async patchQrCodeStudent(id: string, classId: string): Promise<any> {
        try {

            // Validar se ja existe um qr code para aula se existir travar o usuario 
            await this.studentStorage.postGenerateQrCodeStudent(id);
            const qrCodeValue = generateRandomQRCode(50);
            const expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + 10);
            
            // Criando o objeto com os dados necessários
            const qrCodeObject = {
                id: uuidv4(),
                student_id: id,
                class_id: classId,
                date_expiration: expirationDate,
                created_at: new Date(), // Definindo a data de criação do código
                used: false,
                code: qrCodeValue
            };
    
            // Chamando o método adequado no studentStorage
           await this.studentStorage.postGenerateQrCodeStudent(qrCodeObject);
           return {id: qrCodeObject.id}
    
        } catch (error: any) {
            console.error(`Erro ao gerar código QR para aluno: ${error.message}`);
            throw error;
        }
    }

    
    public static async getQrCode(id: string): Promise<string> {
        try {
            console.log('caiu aqui:22?')
            const studentData = await this.studentStorage.findByQrCode(id); // Supondo que studentStorage é sua classe de armazenamento para alunos
            
            if (!studentData) {
                throw new Error('QRCODE não encontrado');
            }
           const qrCode = qr.imageSync(JSON.stringify(studentData), { type: 'png' }); // Gera um Buffer
           const qrCodeBase64 = qrCode.toString('base64');
           return qrCodeBase64;
        } catch (error: any) {
            console.error(`Erro ao gerar código QR para aluno: ${error.message}`);
            throw error;
        }
    }
// aqui vai ser aonde o usuario vai marcar presença e por isso precisamos de algumas validaçoes     
public static async patchAttendanceQrCodeService(attendanceObj: any, studentId: string): Promise<string> {//lendo qrcode
    try {
        // Transforma o array em objeto acessando o primeiro elemento
        const qrCodeData = attendanceObj[0];

        // Aqui continua o seu código existente
        const foundQrCodeData = await this.studentStorage.findByQrCode(qrCodeData.id);
        const foundQrCodeObj = foundQrCodeData[0]
        console.log(foundQrCodeData, 'oque foi achado?')

        // Validações continuam conforme o seu código original
        if (!foundQrCodeObj) {
            throw new BadRequestExeception(CODE_ERROR_QRCODE_NOT_FOUND);
        }
        //precisamos remover da tabela qrcode a coluna usado, 1 qrcode pra n alunos
        if (foundQrCodeObj.id !== qrCodeData.id) {
            throw new BadRequestExeception(CODE_ERROR_QRCODE_ID_DIFERRENT);
        }

        if (foundQrCodeObj.code !== qrCodeData.code) {
            throw new BadRequestExeception(CODE_ERROR_QRCODE_DIFERRENT_CODE);
        }

        const currentDate = new Date();
        const expirationDate = new Date(foundQrCodeObj.date_expiration);

        if (currentDate > expirationDate) {
            throw new BadRequestExeception(CODE_ERROR_QRCODE_EXPIRED);
        }

        const attendance = await this.studentStorage.findByIdClassAndStudentId(foundQrCodeObj.class_id, studentId);

        console.log(attendance, foundQrCodeObj.class_id)

        if(attendance) {
            throw new BadRequestExeception(CODE_ERROR_ATTENDANCE_IS_ALEARDLY_MARKED);

        }

       const attendanceObjStorage = {
            id: uuidv4(),
            date: new Date(),
            student_id: studentId,
            class_id: foundQrCodeObj.class_id,
            attendance: true,
        }

        await this.studentStorage.postMarkAttendance(attendanceObjStorage)

        // Retorne qrCodeData se for o que você precisa retornar
        return qrCodeData;
    } catch (error: any) {
        console.error(`Erro a o ler e marcar presença para aluno: ${error.message}`);
        throw error;
    }
}

}
