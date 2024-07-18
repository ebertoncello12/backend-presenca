import { UserStorage } from "../Storage/UserStorage";
import { ResourceNotFoundExeception } from "../../../../Exception/ResourceNotFoundExeception";
import { UnauthorizedExeception } from "../../../../Exception/UnauthorizedExeception";
import BCryptoHelper from "../../Helper/BCryptoHelper";
import { AuthHelper } from "../../Helper/AuthHelper";
import { StudentStorage } from "../../../Student/Storage/StudentStorage";


export class UserService {

    private static userStorage = new UserStorage();
    private static studentStorage = new StudentStorage();

    public static async createUserService(userObj: any): Promise<any> {
        try {

            const userResponse = await this.userStorage.createUser(userObj); // Chama o método findById do StudentStorage
            
            return userResponse;
        } catch (error: any) {
            console.error(`Erro ao criar usuário: ${error.message}`);
            throw error; // Rejeita a promise com o erro capturado
        }
    }

    
    public static async authValidateUserService(authValidateUserObj: any): Promise<any> {
        try {
            const EXPIRES_TOKEN = 120
            const EXPIRES_REFRESH_TOKEN = Number(EXPIRES_TOKEN) * 60;
            console.log('caiu no nosso service ?')
            // Buscar o usuario pelo login se nao existir ja travar o usuario
            const userResponse = await this.userStorage.getUserByEmail(authValidateUserObj.email); 

            if(!userResponse) {
                throw new ResourceNotFoundExeception('Aluno por e-mail nao encontrado');
            }
            let studentResponse;
            if(userResponse.student_id) {
              studentResponse = await this.studentStorage.findById(userResponse.student_id)
            }
            if(!userResponse || userResponse.status !== "ATIVO") {
                throw new UnauthorizedExeception();
            }
            // Compara a senha a senha do banco hasheada
            const isPasswordValid = await BCryptoHelper.compareValueWithHash(authValidateUserObj.password, userResponse.password);
            if(!isPasswordValid) {
                throw new UnauthorizedExeception();
            }
           // Atualizar o logget_at ultimo login
            await this.userStorage.updateLastLogged(userResponse.id);
            // Gerar o token e fazer diversas validaçoes
            const authToken = await AuthHelper.generateJwtToken(userResponse, studentResponse || null, EXPIRES_TOKEN, EXPIRES_REFRESH_TOKEN)
            return authToken;
        } catch (error: any) {
            console.error(`Erro ao criar usuário: ${error.message}`);
            throw error; // Rejeita a promise com o erro capturado
        }
    }

}
