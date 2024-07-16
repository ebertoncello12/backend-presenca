import { knexInstance } from "../../../Database/KnexConnection";
import { generateRandomQRCode } from "../../../Helper/GenerateQrCodeHelper";
import bcrypt from 'bcrypt'
import { ResourceNotFoundExeception } from "../../../Exception/ResourceNotFoundExeception";

export class UserStorage {

    public async createUser(userObj: any): Promise<any> {
        try {
            console.log(userObj)
            // Passo 1: Encontrar a presença do aluno
            const user = await knexInstance<any>('users').where({ email: userObj.email }).first();
            console.log(user)
            if(user){

                throw new ResourceNotFoundExeception('Email já cadastrado, favor inserir outro e-mail');
            }

            const hashPassword = await bcrypt.hash(userObj.password, 10)

            console.log(hashPassword)

            const newUserObj = {
                ...userObj, 
                password: hashPassword,
            }

            console.log(newUserObj, 'teste')

            await knexInstance<any>('users').insert(newUserObj);

            return {id: userObj.id};
            
        } catch (e: any) {
            console.error(`Error retrieving student details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

}
