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
}