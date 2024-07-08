import LocationsRepository from '../repositories/locations-repository.js';
import Object from '../entities/returnObject.js';
import VH from '../helpers/validaciones-helper.js'

const validaciones = new VH();

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
    getLocationById = async (id) => {
        const repo = new LocationsRepository();
        let returnObject = new Object();

        if(!await validaciones.ValidarID(id, 'locations')){
            returnObject = Object.negarObjeto('No existe la id del objeto');
            return returnObject;
        }

        const response = await repo.getLocationById(id);

        returnObject.status = true;
        returnObject.code = 200;
        returnObject.JSONcontent = response.rows;

        return returnObject;
    }
}

export default LocationsService;