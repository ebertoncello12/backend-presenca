import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedExeception } from '../Exception/UnauthorizedExeception';
import { AuthHelper } from '../routes/Login/Helper/AuthHelper';
import { ResourceNotFoundExeception } from '../Exception/ResourceNotFoundExeception';

// Função para verificar o token
export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization;


    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({
            errors: {
                code: 'CODE_ERROR_UNAUTHORIZED',
                message: 'Token inválido ou não fornecido'
            }
        });
    }

    const authToken = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(authToken, '26534a9c3e5d-4953849384513aa7df07' || '');
        next();
    } catch (error) {
        return res.status(401).json({
            errors: {
                code: 'CODE_ERROR_UNAUTHORIZED',
                message: 'Token inválido'
            }
        });
    }
};

export const validateJwtIsTeacher = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization || '';
    
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({
            errors: {
                code: 'CODE_ERROR_UNAUTHORIZED',
                message: 'Token inválido ou não fornecido'
            }
        });
    }

    const authToken = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(authToken, '26534a9c3e5d-4953849384513aa7df07' || '');

        // Verifica se o grupo do usuário permite acesso
        const payload: any = decodedToken
        if (payload.payload.group !== "ADM" && payload.payload.group !== "TEACHER") {
            return res.status(401).json({
                errors: [{
                    code: 'CODE_ERROR_UNAUTHORIZED',
                    message: 'Seu usuário não tem permissão para isso'
                }]
            });
        }

        // Se tudo estiver correto, passa para o próximo middleware
        next();
    } catch (error) {
        return res.status(401).json({
            errors: {
                code: 'CODE_ERROR_UNAUTHORIZED',
                message: 'Token inválido'
            }
        });
    }
};
