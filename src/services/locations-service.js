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
            returnObject = Object.negarObjeto('No existe la id de la location');
            return returnObject;
        }

        const response = await repo.getLocationById(id);

        returnObject.status = true;
        returnObject.code = 200;
        returnObject.JSONcontent = response.rows;

        return returnObject;
    }
    getEventLocationByLocationId = async (locationId, userId) => {
        const repo = new LocationsRepository();
        let returnObject = new Object();

        if(!await validaciones.ValidarID(locationId, 'locations')){
            returnObject = Object.negarObjeto('No existe la id de la location');
            return returnObject;
        }

        const response = await repo.getEventLocationByLocationId(locationId, userId);

        if(!response.rowCount > 0){
            returnObject = Object.negarObjeto('No te pertenece el event-location');
            return returnObject;
        }

        returnObject.status = true;
        returnObject.code = 200;
        returnObject.JSONcontent = response.rows;

        return returnObject;
    }
}

export default LocationsService;