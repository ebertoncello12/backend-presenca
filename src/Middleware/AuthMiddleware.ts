import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedExeception } from '../Exception/UnauthorizedExeception';
import { AuthHelper } from '../routes/Login/Helper/AuthHelper';
import { ResourceNotFoundExeception } from '../Exception/ResourceNotFoundExeception';

// Função para verificar o token
export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization;

    console.log('caiu aqui ?')

    if (!token || !token.startsWith('Bearer ')) {
        throw new ResourceNotFoundExeception('Token invalido ou nao fornecido');
    }

    const authToken = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(authToken, '26534a9c3e5d-4953849384513aa7df07' || '');
        console.log('token validado') // Defina a estrutura do payload conforme seu token
        next();
    } catch (error) {
        throw new UnauthorizedExeception();
    }
};

export const validateJwtIsTeacher = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization;
    const isTeacher = await AuthHelper.getPayload(String(token))
    console.log(isTeacher)
    next();
};
