import {Router} from 'express';
import LocationsService from '../services/locations-service.js'
import Locations from '../entities/locations.js';
import AutenticationMiddleware from "../middlewares/AutenticationMiddleware.js"

const router = Router();
const middleware = new AutenticationMiddleware();
const svc = new LocationsService();

router.get('', async (req, res) => {
    let response;
    const returnObject = await svc.getLocations(req.body.page);
    response = res.status(returnObject.code).json(returnObject.JSONcontent);
    return response;
});
router.get('/:id', async (req, res) => {
    let response;
    const returnObject = await svc.getLocationById(req.params.id);

    if(!returnObject.status){
        response = res.status(returnObject.code).json(returnObject.message);  
    }
    else{
        response = res.status(returnObject.code).json(returnObject.JSONcontent);
    }
    return response;
});

router.get('/:id/event-location', middleware.AuthMiddleware, async (req, res) => {
    let response;
    const returnObject = await svc.getEventLocationByLocationId(req.params.id, req.user.id);

    if(!returnObject.status){
        response = res.status(returnObject.code).json(returnObject.message);  
    }
    else{
        response = res.status(returnObject.code).json(returnObject.JSONcontent);
    }
    return response;

});

export default router;