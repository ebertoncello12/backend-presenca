import { Router } from "express";

const StudentRoute = Router();

StudentRoute.get('/:id', (req, res) => {
    res.send('Teste da rota Student');
});

export default StudentRoute

