import { knexInstance } from "../../../../Database/KnexConnection";
import { generateRandomQRCode } from "../../../../Helper/GenerateQrCodeHelper";
import bcrypt from 'bcrypt'
import { ResourceNotFoundExeception } from "../../../../Exception/ResourceNotFoundExeception";

export class UserStorage {

    public async createUser(userObj: any): Promise<any> {
        try {
            // Passo 1: Encontrar a presença do aluno
            const user = await knexInstance<any>('users').where({ email: userObj.email }).first();
            if(user){

                throw new ResourceNotFoundExeception('Email já cadastrado, favor inserir outro e-mail');
            }

            const hashPassword = await bcrypt.hash(userObj.password, 10)


            const newUserObj = {
                ...userObj, 
                password: hashPassword,
            }


            await knexInstance<any>('users').insert(newUserObj);

            return {id: userObj.id};
            
        } catch (e: any) {
            console.error(`Error retrieving student details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

    public async getUserByEmail(email: string): Promise<any> {
        try {
            // Passo 1: Encontrao usuuario se existir ele ira dar o retorno e se nao o retorno v
            const user = await knexInstance<any>('users').where({ email: email }).first();
            return user
          
            
        } catch (e: any) {
            console.error(`Error retrieving student details: ${e.message}`);
            throw e; // Propaga o erro para tratamento superior, se necessário
        }
    }

    public async updateLastLogged(id: string): Promise<void> {
        try {
            await knexInstance.transaction(async (trx) => {
                await trx('users').where({ id }).update({ logged_at: new Date() });
            });
        } catch (e: any) {
            console.error(`Erro ao atualizar data de login do usuário: ${e.message}`);
            throw e; // Propague o erro para tratamento superior, se necessário
        }
    }

}
