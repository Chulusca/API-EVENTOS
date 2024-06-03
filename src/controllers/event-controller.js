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

export default router;