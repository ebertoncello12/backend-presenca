import { Router } from "express";

const StudentRoute = Router();

StudentRoute.get('/student/:id', (req, res) => {
    res.send('Teste da rota Student');
});

export default StudentRoute

