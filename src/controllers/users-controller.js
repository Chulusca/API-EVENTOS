import {Router} from "express";
import UsersService from '../services/users-service.js';
import AuthService from '../services/auth-service.js'
import Users from '../entities/users.js';

const router = Router();
const svc = new UsersService();

router.post('/login', async (req,res) => {
    let respuesta;
    const returnArray = await svc.Login(req.body.username, req.body.password);
    if (returnArray.success){
        respuesta = res.status(200).json(returnArray);
    }
    else{
        respuesta = res.status(401).json(returnArray);
    }
    return respuesta;
});

router.post('/register', async (req, res) => {
    let respuesta = await svc.Register(new Users (1, req.body.first_name, req.body.last_name, req.body.username, req.body.password));
    if(respuesta === true){
        respuesta = res.status(201).send("Creado con exito");
    }
    else{
        respuesta = res.status(400).send(respuesta);
    }   
    return respuesta;
});

export default router;