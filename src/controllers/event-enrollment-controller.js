import {Router} from "express";
import EventEnrollmentService from '../services/events_enrollment-service.js'
import AutenticationMiddleware from "../middlewares/AutenticationMiddleware.js"

const router = Router();
const middleware = new AutenticationMiddleware();
const svc = new EventEnrollmentService();


//Punto 9

router.post('/:idEvent', middleware.AuthMiddleware, async (req, res) => {
    const returnObject = await svc.enrollUser(req.params.idEvent, req.user.id);
    return res.status(returnObject.code).send(returnObject.message);
});

router.delete('/:idEvent', middleware.AuthMiddleware, async (req, res) => {
    let response;
    const returnObject = await svc.deleteUserEnroll(req.params.idEvent, req.user.id);
    return res.status(returnObject.code).send(returnObject.message);
});


// Punto 10
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

router.patch('/:idEvent/:rating', middleware.AuthMiddleware, async (req, res) => {
    let response; 
    const returnObject = await svc.setRating(req.params.rating, req.body.observations, req.params.idEvent, req.user.id);
    return res.status(returnObject.code).send(returnObject.message);
});


export default router;