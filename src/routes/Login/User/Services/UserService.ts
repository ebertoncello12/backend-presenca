import { UserStorage } from "../Storage/UserStorage";
import { ResourceNotFoundExeception } from "../../../../Exception/ResourceNotFoundExeception";


export class UserService {

    private static userStorage = new UserStorage();

    public static async createUserService(userObj: any): Promise<any> {
        try {

            const userResponse = await this.userStorage.createUser(userObj); // Chama o método findById do StudentStorage
            
            return userResponse;
        } catch (error: any) {
            console.error(`Erro ao criar usuário: ${error.message}`);
            throw error; // Rejeita a promise com o erro capturado
        }
    }

}
