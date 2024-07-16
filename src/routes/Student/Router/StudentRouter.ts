import { Router } from "express";
import { getUserByIdController } from "../Controllers/StudentController";
import { getStudentAttendanceController } from "../Controllers/StudentController";
import { postStudentQrCodeController } from "../Controllers/StudentController";
import { patchQrCodeStudentController } from "../Controllers/StudentController";
import { getQrCode } from "../Controllers/StudentController";





const StudentRoute = Router();

StudentRoute.get('/:id', getUserByIdController)
StudentRoute.get('/attendance/:id', getStudentAttendanceController)
StudentRoute.get('/qrcode/:id', getQrCode)
StudentRoute.post('/generate/qrcode/:classId', postStudentQrCodeController)
StudentRoute.patch('/mark/attendance/:id', patchQrCodeStudentController)




export default StudentRoute

