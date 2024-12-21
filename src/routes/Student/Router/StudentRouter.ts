import { Router } from "express";
import {getUserByIdController, postCreateAttendanceAttemptController} from "../Controllers/StudentController";
import { getStudentAttendanceController } from "../Controllers/StudentController";
import { postStudentQrCodeController } from "../Controllers/StudentController";
import { patchQrCodeStudentController } from "../Controllers/StudentController";
import { getQrCode } from "../Controllers/StudentController";
import express, {NextFunction, Response, Request} from 'express'
import { verifyToken, validateJwtIsTeacher, captureIP } from "../../../Middleware/AuthMiddleware";






const StudentRoute = Router();

StudentRoute.get('/:id', [verifyToken], getUserByIdController)
StudentRoute.get('/attendance/:id', [verifyToken],getStudentAttendanceController)
StudentRoute.get('/qrcode/:id', [validateJwtIsTeacher], getQrCode) // so professor pode fzr isto
StudentRoute.post('/generate/qrcode/:classId', [validateJwtIsTeacher], postStudentQrCodeController) // so professor pode fazer 
StudentRoute.patch('/mark/attendance/:id',[verifyToken, captureIP], patchQrCodeStudentController) // Aluno pode fazer normalmente
StudentRoute.post('/mark/attendance/register/:id',[], postCreateAttendanceAttemptController) // Aluno pode fazer normalmente





export default StudentRoute

