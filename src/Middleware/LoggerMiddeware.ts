// loggerMiddleware.ts

import { Request, Response, NextFunction } from 'express';

const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    
    // Montando as informações da requisição de forma estruturada
    let requestInfo = `
        --------------------
        Nova requisição:
        --------------------
        Timestamp: ${timestamp}
        Método: ${req.method}
        Rota: ${req.originalUrl}
    `;
    
    // Verificando e incluindo o corpo da requisição, se existir
    if (req.body && Object.keys(req.body).length > 0) {
        requestInfo += `        Corpo: ${JSON.stringify(req.body)}\n`;
    }

    // Verificando e incluindo os parâmetros da requisição, se existir
    if (req.params && Object.keys(req.params).length > 0) {
        requestInfo += `        Parâmetros: ${JSON.stringify(req.params)}\n`;
    }

    if (req.query && Object.keys(req.query).length > 0) {
        requestInfo += `        Query: ${JSON.stringify(req.query)}\n`;
    }

    requestInfo += '-------------------\n';

    // Saída dos logs para o console
    console.log(requestInfo);

    // Continua o fluxo da requisição
    next();
};

export default LoggerMiddleware;
