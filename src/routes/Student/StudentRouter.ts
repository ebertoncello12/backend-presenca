import { Router } from "express";
import { getUserById } from "../../Controllers/StudentController";

const StudentRoute = Router();

StudentRoute.get('/:id', getUserById)
export default StudentRoute

