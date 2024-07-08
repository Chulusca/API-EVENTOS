import EventLocationRepository from '../repositories/event-location-repository.js';
import Object from '../entities/returnObject.js';
import VH from '../helpers/validaciones-helper.js'

const validaciones = new VH();

export default class EventLocationService{
    getUserLocations = async (id) => {
        const repo = new EventLocationRepository();
        let returnObject = new Object();

        const response = await repo.getUserLocations(id)

        returnObject.status = true;
        returnObject.code = 200;
        returnObject.JSONcontent = response.rows;
        returnObject.message = "Your locations:"

        return returnObject;
    }

    getUserLocationById = async (userId, locationId) => {
        const repo = new EventLocationRepository();
        let returnObject = new Object();

        const response = await repo.getUserLocationById(userId, locationId)

        if (response.rowCount != 0){
            returnObject.status = true;
            returnObject.code = 200;
            returnObject.JSONcontent = response.rows;
            returnObject.message = "Your location"
        }
        else{
            returnObject.status = false;
            returnObject.code = 404;
            returnObject.message = 'No existe la locacion'
        }

        return returnObject;
    }
    createUserLocation = async (event_location) => {
        const repo = new EventLocationRepository();
        let returnObject = new Object();

        if(!(await validaciones.ValidarID(event_location.id_location, 'locations'))){
            returnObject = Object.negarObjeto('id_locations es invalido');  
            return returnObject;
        }
        if (!validaciones.ValidarCadena(event_location.name, 3) || !validaciones.ValidarCadena(event_location.full_address, 3)){
            returnObject = Object.negarObjeto('Name or Full_address has less than 3 characters'); 
            return returnObject; 
        }
        if(event_location.max_capacity <= 0){
            returnObject = Object.negarObjeto('Invalid max_capacity');
            return returnObject;
        }

        const response = await repo.createUserLocation(event_location);

        if(response.rowCount > 0){
            returnObject.status = true;
            returnObject.code = 200;
            returnObject.message = "EventLocation creado con exito";
        }
        else{
            returnObject = Object.negarObjeto('Error a la hora de crear el event-location');
        }   

        return returnObject;
    }
    deleteUserLocation = async (id, userId) => {
        const repo = new EventLocationRepository();
        let returnObject = new Object();

        const response = await repo.deleteUserLocation(id, userId)

        if(response.rowCount > 0){
            returnObject.status = true;
            returnObject.code = 200;
            returnObject.message = "EventLocation eliminado con exito";         
        }
        else{
            returnObject = Object.negarObjeto('Event location no existe o no le pertenece');
        }
        return returnObject;
    }
    updateUserLocation = async (event_location) => {
        const repo = new EventLocationRepository();
        let returnObject = new Object();

        if(!(await validaciones.ValidarID(event_location.id_location, 'locations'))){
            returnObject = Object.negarObjeto('id_locations es invalido');  
            return returnObject;
        }
        if (!validaciones.ValidarCadena(event_location.name, 3) || !validaciones.ValidarCadena(event_location.full_address, 3)){
            returnObject = Object.negarObjeto('Name or Full_address has less than 3 characters'); 
            return returnObject; 
        }
        if(event_location.max_capacity <= 0){
            returnObject = Object.negarObjeto('Invalid max_capacity');
            return returnObject;
        }

        const response = await repo.updateUserLocation(event_location);

        if(response.rowCount > 0){
            returnObject.status = true;
            returnObject.code = 200;
            returnObject.message = "EventLocation actualizado con exito";
        }
        else{
            returnObject = Object.negarObjeto('Error a la hora de actualizar el event-location');
        }   

        return returnObject;

    }
}