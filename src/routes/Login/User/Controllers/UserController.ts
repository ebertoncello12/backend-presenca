import { Request, Response } from "express"
import { UserService } from "../Services/UserService";
import { randomUUID } from "crypto";



    export const createUser = async (req: Request, res: Response): Promise<void> => {
        const { name, email, group,  status, password, } = req.body

        const userObj = {
            id: randomUUID(),
            name: name,
            email: email,
            group: group,
            status: status,
            password: password
        }
        try {
            const data = await UserService.createUserService(userObj); // Chama o método de forma assíncrona usando await
            // const response = await StudentTransformer.transformStudent(data); // Chama o método de forma assíncrona usando await
            res.status(200).send(data);
        } catch (error: any) {
            console.error('Erro ao buscar aluno:', error);
            res.status(500).json({ message: error.errors });
        }

    }

    
    export const authValidateUser = async (req: Request, res: Response): Promise<void> => {
        const { email, password, } = req.body
        const authValidateObj = {
            password: password,
            email: email,
        }
        try {
            const data = await UserService.authValidateUserService(authValidateObj); // Chama o método de forma assíncrona usando await
            // const response = await StudentTransformer.transformStudent(data); // Chama o método de forma assíncrona usando await
            res.status(200).send(data);
        } catch (error: any) {
            console.error('Erro ao buscar aluno:', error);
            res.status(500).json({ message: error.errors });
        }

    }
