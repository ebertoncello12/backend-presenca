import { NextFunction, Request, Response } from 'express';
import { StudentService } from '../Services/StudentService';
import { StudentTransformer } from '../../../transformers/StudentTranformer';
import jwt from 'jsonwebtoken'
import { AuthHelper } from '../../Login/Helper/AuthHelper';
import { verifyToken } from '../../../Middleware/AuthMiddleware';

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
   
    
    try {
        const data = await StudentService.getStudentByIdService(id); // Chama o método de forma assíncrona usando await
        // const response = await StudentTransformer.transformStudent(data); // Chama o método de forma assíncrona usando await
        res.status(200).send(data);
    } catch (error: any) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ message: error.errors });
    }
};

export const getStudentAttendanceController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
        const data = await StudentService.getStudentAttendanceService(id); // Chama o método de forma assíncrona usando await
        // const response = await StudentTransformer.transformStudent(data); // Chama o método de forma assíncrona usando await
        res.status(200).send(data);
    } catch (error: any) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ message: error.errors });
    }
};

export const postStudentQrCodeController = async (req: Request, res: Response): Promise<void> => {
    const { classId } = req.params;
    try {
        const data = await StudentService.postQrCodeStudentService(classId); // Chama o método de forma assíncrona usando await
        res.status(200).send(data);
    } catch (error: any) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ message: error.errors });
    }
};

export const getQrCode = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const qrCode = await StudentService.getQrCode(id);
        res.status(200).send(qrCode); // Send status and response body in one statement
    } catch (error: any) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ message: error.message }); // Use error.message instead of error.errors
    }
};


export const patchQrCodeStudentController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await StudentService.patchAttendanceQrCodeService(req.body, id);
        res.sendStatus(204);
    } catch (error: any) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ message: error.message }); // Use error.message instead of error.errors
    }
};




