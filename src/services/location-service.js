import LocationRepository from '../repositories/location-repository.js';
import Object from '../entities/returnObject.js';

export default class LocationService{
    getUserLocations = async (id) => {
        const repo = new LocationRepository();
        let returnObject = new Object();

        const response = await repo.getUserLocations(id)

        returnObject.status = true;
        returnObject.code = 200;
        returnObject.JSONcontent = response.rows;
        returnObject.message = "Your locations:"

        return returnObject;
    }
}