import {Router} from "express";
import EventService from '../services/event-service.js';
import Event from '../entities/events.js';
import EventEnrollmentService from '../services/events_enrollment-service.js'
import AutenticationMiddleware from "../middlewares/AutenticationMiddleware.js"

const router = Router();
const middleware = new AutenticationMiddleware();
const svc = new EventService();
const enrollmentService = new EventEnrollmentService();

router.get('', async(req, res) => {
    let response; 
    const returnArray = await svc.getAllAsync();

    if(returnArray == null){
        response = res.status(404).send('No se encontraron eventos');
    }
    else{
        response = res.status(200).json(returnArray);
    }

    return response;
});

router.get('/search', async (req, res) => {
    let response;
    const returnArray = await svc.getAsync(req.query.name, req.query.category, req.query.startdate, req.query.tag);
    
    if(returnArray == null){
        response = res.status(404).send('No se encontro el evento que cumpla con las caracteristicas');
    }
    else{
        response = res.status(200).json(returnArray);
    }
    return response;
});

router.get('/:id', async(req, res) => {
    let response;
    const returnArray = await svc.getById(req.params.id);

    if(returnArray == null){
        response = res.status(404).send('No se encontro el evento que cumpla con las caracteristicas');
    }
    else{
        response = res.status(200).json(returnArray);
    }
    return response;
});

router.get('/:id/enrollment', async (req, res) => {
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

// Eliminacion de eventos (CRUD)

router.post('', middleware.AuthMiddleware, async (req, res) => {
    let response;
    const returnArray = await svc.createEvent(new Event(0, req.body.name, req.body.description, req.body.id_event_category, 
        req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, 
        req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id));

    if(returnArray.status){
        response = res.status(201).send(returnArray.message);
    }
    else{   
        response = res.status(400).send(returnArray.message);
    }
    return response;
});

router.put('', middleware.AuthMiddleware, async (req,res) => {
    let response; 
    const returnArray = await svc.UpdateEvent(new Event(req.body.id, req.body.name, req.body.description, req.body.id_event_category, 
        req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, 
        req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id));
    if(returnArray.status){
        response = res.status(201).send(returnArray.message);
    }
    else{   
        response = res.status(400).send(returnArray.message);
    }   
    return response;
});

router.delete('/:id', middleware.AuthMiddleware, async (req, res) => {
    let response; 
    const returnObject = await svc.DeleteEventById(req.params.id);

    if(returnObject.status){
        response = res.status(returnObject.code).send(returnObject.message);
    }
    else{
        response = res.status(returnObject.code).send(returnObject.message);
    }
    return response;
});

// Inscripcion a un evento

router.post('/:id/enrollment', middleware.AuthMiddleware, async (req, res) => {
    let response;
    const returnObject = await enrollmentService.RegistrarUsuario(req.params.id);
    
});



export default router;