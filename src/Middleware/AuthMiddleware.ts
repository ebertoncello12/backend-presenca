import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedExeception } from '../Exception/UnauthorizedExeception';
import { AuthHelper } from '../routes/Login/Helper/AuthHelper';
import requestIp from 'request-ip';
import axios from 'axios';


import { ResourceNotFoundExeception } from '../Exception/ResourceNotFoundExeception';

// Função para verificar o token
export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization;
    console.log(token)

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
        console.log(error)
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
// Middleware para capturar o IP do cliente
export const captureIP = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Usa request-ip para capturar o IP do cliente
        const clientIP = requestIp.getClientIp(req) || '';
        console.log(clientIP);

        // Adiciona o IP capturado ao objeto req para uso posterior
        (req as any).clientIP = clientIP;

        // Utiliza uma API de geolocalização para buscar informações do IP
        const geoLocationAPI = `http://ip-api.com/json/${'179.116.11.31'}?fields=status,regionName,city`;
        const response = await axios.get(geoLocationAPI);


        console.log(response)

        // Verifica se a localização está na região de Campinas, SP
        if (response.data.status === 'success' &&
            response.data.regionName === 'São Paulo' &&  // Verifica se é o estado de São Paulo
            response.data.city === 'Paulínia') {         // Verifica se é a cidade de Campinas
            next();  // IP está na região correta, continua para o próximo middleware
        } else {
            // IP não está na região de Campinas, retorna status 401 Unauthorized
            return res.status(401).json({ message: 'Sem acesso nessa região' });
        }
    } catch (error) {
        console.error('Error capturing IP or checking location:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};