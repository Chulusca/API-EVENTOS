import PostgreQuery from "../helpers/query-sql-helper.js"
const PQ = new PostgreQuery();

export default class EventsEnrrollmentRepository{

    getUsersEnrolls = async(sql, values) => {
        let returnArray = await PQ.PostgreQuery(sql, values);
        if (returnArray){
            return returnArray.rows;      
        }
        else{
            return null;
        } 
    }

    setRating = async(rating, observation, idEvent, idUser) => {
        const sql = `UPDATE event_enrollments SET rating = $1, observations = $2 where id_event = $3 and id_user = $4`;
        const values = [rating, observation, idEvent, idUser];
        let returnArray = await PQ.PostgreQuery(sql, values);
        console.log(returnArray);
        return returnArray;
    }
    enrollUser = async (idEvent, idUser, fechaActual) => {
        const sql = `INSERT INTO event_enrollments (id_event, id_user, registration_date_time, attended)
        VALUES ($1, $2, $3, B'0');`;
        const values = [idEvent, idUser, fechaActual];
        let returnArray = await PQ.PostgreQuery(sql, values);
        return returnArray;
    }
    deleteUserEnroll = async (idEvent, idUser) => {
        const sql = `DELETE FROM event_enrollments WHERE id_event = $1 and id_user = $2`;
        const values = [idEvent, idUser];
        let returnArray = await PQ.PostgreQuery(sql, values);
        return returnArray;
    }
    
}