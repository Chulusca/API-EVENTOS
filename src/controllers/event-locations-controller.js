import {Router} from "express";
import EventLocation from '../services/event-location-service.js';
import EventLocations from '../entities/event_locations.js';
import AutenticationMiddleware from "../middlewares/AutenticationMiddleware.js"

const router = Router();
const middleware = new AutenticationMiddleware();
const svc = new EventLocation();


router.get('', middleware.AuthMiddleware, async (req, res) =>{
    let response; 
    const returnObject = await svc.getUserLocations(req.user.id)

    response = res.status(returnObject.code).json(returnObject.JSONcontent);
    return response;
});

router.get('/:id', middleware.AuthMiddleware, async (req, res) =>{
    let response; 
    const returnObject = await svc.getUserLocationById(req.user.id, req.params.id)
    if (returnObject.status){
        response = res.status(returnObject.code).json(returnObject.JSONcontent);
    }
    else{
        response = res.status(returnObject.code).send(returnObject.message);
    }
    
    return response;
});

router.post('', middleware.AuthMiddleware, async (req, res) => {
    let response;
    const returnObject = await svc.createUserLocation(new EventLocations(1, req.body.id_location, req.body.name, 
        req.body.full_address, req.body.max_capacity,
        req.body.latitude, req.body.longitude, req.user.id));

    return res.status(returnObject.code).send(returnObject.message);

});

router.put('', middleware.AuthMiddleware, async (req, res) => {
    let response;
    const returnObject = await svc.updateUserLocation(new EventLocations(req.body.id, req.body.id_location, req.body.name, 
        req.body.full_address, req.body.max_capacity,
        req.body.latitude, req.body.longitude, req.user.id));
    return res.status(returnObject.code).send(returnObject.message);
});

router.delete('/:id', middleware.AuthMiddleware, async (req, res) => {
    let response;
    const returnObject = await svc.deleteUserLocation(req.params.id, req.user.id);
    return res.status(returnObject.code).send(returnObject.message);
});

export default router;