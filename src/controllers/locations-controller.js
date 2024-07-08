import {Router} from 'express';
import LocationsRepository from '../services/locations-service.js'
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

export default router;