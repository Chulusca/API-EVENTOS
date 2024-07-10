import EventsEnrollmentRepository from '../repositories/event_enrollment-repository.js';
import Object from '../entities/returnObject.js'
import VH from '../helpers/validaciones-helper.js'

const validaciones = new VH();

export default class EventsEnrollmentService{

    getUsersEnrolls = async(id, first_name, last_name, username, attended, rating) => {
        const repo = new EventsEnrollmentRepository();
        let query = `
            SELECT u.id, u.first_name, u.last_name, u.username
            FROM users u
            JOIN event_enrollments ee ON u.id = ee.id_user
            WHERE ee.id_event = $1
        `;
        const params = [id];

        if (first_name) {
            query += ` AND u.first_name ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(first_name);
        }
        if (last_name) {
            query += ` AND u.last_name ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(last_name);
        }
        if (username) {
            query += ` AND u.username ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(username);
        }
        if (attended !== undefined) {
            query += ` AND ee.attended = $${params.length + 1}`;
            params.push(attended);
        }
        if (rating !== undefined) {
            query += ` AND ee.rating > $${params.length + 1}`;
            params.push(rating);
        }
        const returnArray = repo.getUsersEnrolls(query, params);
        return returnArray;
    }

    setRating = async (rating, observation, idEvent, idUser) => {
        let returnObject = new Object();
        const repo = new EventsEnrollmentRepository();
        if(rating > 10 || rating < 0){
            returnObject = Object.negarObjeto('Rating invalido');
            return returnObject;
        }
        if(!await validaciones.EventoTermino(idEvent)){
            returnObject = Object.negarObjeto('El evento aun no finalizo'); 
            return returnObject;
        }

        const response = await repo.setRating(rating, observation, idEvent, idUser);

        if(response.rowCount > 0){
            returnObject.status = true;
            returnObject.message = 'Rating actualizado con exito';
            returnObject.code = 200;
        }
        else{
            returnObject = Object.negarObjeto('El evento no existe o usted no esta registrado');
        }
        return returnObject;
    }
    
    enrollUser = async (idEvent, idUser) =>{
        let returnObject = new Object();
        const repo = new EventsEnrollmentRepository();
        const fechaActual = new Date().toISOString();
        
        if(await validaciones.EventoTermino(idEvent)){
            returnObject = Object.negarObjeto('El evento ya termino');
            return returnObject;
        }
        if(!await validaciones.EnableEnrollment(idEvent)){
            returnObject = Object.negarObjeto('El evento no esta habilitado para registrarse');
            return returnObject;
        }
        if(await validaciones.EventIsFull(idEvent)){
            returnObject = Object.negarObjeto('El evento esta lleno o no existe');
            return returnObject;
        }
        if(await validaciones.UserAlreadyEnroll(idEvent, idUser)){
            returnObject = Object.negarObjeto('El usuario ya se encuentra registrado');
            return returnObject
        }
        
        const response = await repo.enrollUser(idEvent, idUser, fechaActual); 

        if(response.rowCount > 0){
            returnObject.status = true;
            returnObject.message = 'Se registro correctamente al evento';
            returnObject.code = 200;
        }
        else{
            returnObject = Object.negarObjeto('Sucedio un error al crear el evento');
        }
        return returnObject;
    }
    

}