import PostgreQuery from "../helpers/query-sql-helper.js";
const PQ = new PostgreQuery();

export default class LocationsRepository{

    getUserLocations = async (id) => {
        const sql = `select * from event_locations where id_creator_user = $1`;
        const values = [id];
        return await PQ.PostgreQuery(sql, values);
    }
}