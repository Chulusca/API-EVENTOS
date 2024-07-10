import {Router} from "express";
import EventEnrollmentService from '../services/events_enrollment-service.js'
import AutenticationMiddleware from "../middlewares/AutenticationMiddleware.js"

const router = Router();
const middleware = new AutenticationMiddleware();
const svc = new EventEnrollmentService();

router.get('/:id', async (req, res) => {
    let response;
    const returnArray = await svc.getUsersEnrolls(req.params.id, req.query.first_name, req.query.last_name, req.query.username, req.query.attended, req.query.rating);
    if(returnArray == null){
        response = res.status(404).send('No se encontraron usuarios que cumplan con las caracteristicas');
    }
    else{
        response = res.status(200).json(returnArray);
    }
    return response;
});

export default router;