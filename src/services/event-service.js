import EventRepository from '../repositories/event-repository.js';

export default class EventService{

    getAllAsync = async(page = 1) =>{
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync(page);
        return returnArray;

    }
}