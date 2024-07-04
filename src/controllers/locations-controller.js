import {Router} from "express";
import Location from '../services/location-service.js';
import EventLocations from '../entities/event_locations.js';
import AutenticationMiddleware from "../middlewares/AutenticationMiddleware.js"

const router = Router();
const middleware = new AutenticationMiddleware();
const svc = new Location();


router.get('', middleware.AuthMiddleware, async (req, res) =>{
    let response; 
    const returnObject = await svc.getUserLocations(req.user.id)

    response = res.status(returnObject.code).json(returnObject.JSONcontent);
    return response;
});


export default router;