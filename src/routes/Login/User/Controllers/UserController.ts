import { Request, Response } from "express"
import { UserService } from "../Services/UserService";



    export const createUser = async (req: Request, res: Response): Promise<void> => {
        const { id, name, email, group,  status, password, } = req.body

        const userObj = {
            id: id,
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
