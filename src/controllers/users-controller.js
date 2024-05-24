import {Router} from "express";
import UsersService from '../services/users-service.js';
import AuthService from '../services/auth-service.js'
import users from '../entities/users.js';

const router = Router();
const svc = new UsersService();

//Endpoints de user - Este archivo va a usar el servicio users service y usara el auth-service como middleware

router.post('/login', async (req,res) => {
    let respuesta;
    const returnArray = await svc.Login(req.body.username, req.body.password);
    if (returnArray.success){
        respuesta = res.status(200).json(returnArray);
    }
    else{
        respuesta = res.status(401).json(returnArray);
    }
    return returnArray;
});

export default router;