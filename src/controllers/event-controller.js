import {Router} from "express";
import EventService from '../services/event-service.js';
import Events from '../entities/events.js';

const router = Router();
const svc = new EventService();

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
    
});

router.get('/:id/enrollment', async (req, res) => {
    let response;
    const returnArray = await svc.getUsersEnrolls(req.query.first_name, req.query.last_name, req.query.username, req.query.attended, req.query.rating);

    if(returnArray == null){
        response = res.status(404).send('No se encontro el evento que cumpla con las caracteristicas');
    }
    else{
        response = res.status(200).json(returnArray);
    }
});

export default router;