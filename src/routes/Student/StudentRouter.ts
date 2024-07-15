import { Router } from "express";
import { getUserByIdController } from "../../controllers/StudentController";
import { getStudentAttendanceController } from "../../controllers/StudentController";
import { postStudentQrCodeController } from "../../controllers/StudentController";
import { patchQrCodeStudentController } from "../../controllers/StudentController";

import { getQrCode } from "../../controllers/StudentController";






const StudentRoute = Router();

StudentRoute.get('/:id', getUserByIdController)
StudentRoute.get('/attendance/:id', getStudentAttendanceController)
StudentRoute.get('/qrcode/:id', getQrCode)
StudentRoute.post('/generate/qrcode/:id/:classId', postStudentQrCodeController)
StudentRoute.patch('/mark/attendance/:id', patchQrCodeStudentController)




export default StudentRoute

