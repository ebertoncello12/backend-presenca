import { Router } from "express";
import { getUserByIdController } from "../Controllers/StudentController";
import { getStudentAttendanceController } from "../Controllers/StudentController";
import { postStudentQrCodeController } from "../Controllers/StudentController";
import { patchQrCodeStudentController } from "../Controllers/StudentController";
import { getQrCode } from "../Controllers/StudentController";
import express, {NextFunction, Response, Request} from 'express'
import { verifyToken, validateJwtIsTeacher } from "../../../Middleware/AuthMiddleware";






const StudentRoute = Router();

StudentRoute.get('/:id', getUserByIdController)
StudentRoute.get('/attendance/:id', [verifyToken],getStudentAttendanceController)
StudentRoute.get('/qrcode/:id', [verifyToken], getQrCode) // so professor pode fzr isto
StudentRoute.post('/generate/qrcode/:classId', postStudentQrCodeController) // so professor pode fazer 
StudentRoute.patch('/mark/attendance/:id', patchQrCodeStudentController) // Aluno pode fazer normalmente





export default StudentRoute

