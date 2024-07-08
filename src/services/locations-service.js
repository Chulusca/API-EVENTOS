import LocationsRepository from '../repositories/locations-repository.js';
import Object from '../entities/returnObject.js';
import VH from '../helpers/validaciones-helper.js'

class LocationsService{
    getLocations = async (page) => {
        const repo = new LocationsRepository();
        let returnObject = new Object();

        const response = await repo.getLocations(page);

        returnObject.status = true;
        returnObject.code = 200;
        returnObject.JSONcontent = response.rows;

        return returnObject;
    }
}

export default LocationsService;