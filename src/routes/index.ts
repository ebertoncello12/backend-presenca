import { Router } from "express";

const route = Router();

route.get('/', (req, res) => {
    res.send('Teste da primeira rota');
});

export default route

