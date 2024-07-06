import PostgreQuery from "../helpers/query-sql-helper.js";
const PQ = new PostgreQuery();

export default class EventLocationsRepository{

    getUserLocations = async (id) => {
        const sql = `select * from event_locations where id_creator_user = $1`;
        const values = [id];
        return await PQ.PostgreQuery(sql, values);
    }
    getUserLocationById = async (userId, locationId) => {
        const sql = `select * from event_locations where id_creator_user = $1 and id = $2`;
        const values = [userId, locationId];
        return await PQ.PostgreQuery(sql, values);
    }
    createUserLocation = async (event_location) => {
        const sql = `INSERT INTO public.event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) 
            VALUES ($1, $2, $3, $4, $5, $6, $7);`;
        const values = [event_location.id_location, event_location.name, event_location.full_address, event_location.max_capacity, event_location.latitude, event_location.longitude, event_location.id_creator_user];
        return await PQ.PostgreQuery(sql, values);
    }
    deleteUserLocation = async (id, userId) => {
        const sql = `DELETE FROM event_locations WHERE id = $1 and id_creator_user = $2`
        const values = [id, userId];
        return await PQ.PostgreQuery(sql, values);
    }

}