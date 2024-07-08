import PostgreQuery from "../helpers/query-sql-helper.js"
const PQ = new PostgreQuery();

export default class LocationsRepository{
    getLocations = async (page = 0) => {
        const sql = `SELECT * FROM locations
        OFFSET $1 
        LIMIT 10;`
        let values = [(page * 10)]
        return await PQ.PostgreQuery(sql, values);
    }
}
