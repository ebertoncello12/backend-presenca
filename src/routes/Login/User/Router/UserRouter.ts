import { Router } from "express";
import { getUserByIdController } from "../../../Student/Controllers/StudentController";
import { authValidateUser, createUser } from "../Controllers/UserController";

const UserRoute = Router()
UserRoute.post('/create', createUser)
UserRoute.post('/auth', authValidateUser);

export default UserRoute


