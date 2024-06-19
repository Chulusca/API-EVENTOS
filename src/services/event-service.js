import EventRepository from '../repositories/event-repository.js';
import VH from '../helpers/validaciones-helper.js'
import EventsEnrollmentService from '../services/events_enrollment-service.js';

const validaciones = new VH();
const EEsvc = new EventsEnrollmentService();

export default class EventService{

    getAsync = async(name, category, startdate, tag) => {
        const repo = new EventRepository();
        let sql = 'WHERE ';
        if(name != null){
            sql += `name = '${name}' AND `;
        }
        if(category != null){
            console.log("llego")
            sql += `id_event_category = ${category} AND `;
        }
        if(startdate != null){
            sql += `start_date = '${startdate}' AND `;
        }
        if(tag != null){
            sql += `tag = '${tag}' AND `;
        }
        sql = sql.substring(0,((sql.length)-5));
        const returnArray = await repo.getAsync(sql);
        return returnArray;

    }

    getAllAsync = async(page = 1) =>{
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync(page);
        return returnArray;

    }
    getById = async(id) =>{
        const repo = new EventRepository();
        const returnArray = await repo.getById(id);
        return returnArray;
    }

    getUsersEnrolls = async(id, first_name, last_name, username, attended, rating) => {
        return EEsvc.getUsersEnrolls(id, first_name, last_name, username, attended, rating);
    }
}