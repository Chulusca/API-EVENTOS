import config from "../configs/dbconfig.js";
import pkg from 'pg';
const {Client} = pkg;

export default class CategoriesRepository{
    
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(config);
        try{
            await client.connect();
            const sql = `SELECT * FROM event_categories order by display_order ASC`
            const result = await client.query(sql);
            returnArray = result.rows;
        }
        catch(error){
            console.log(error);
        }
        finally {
            await client.end();
        }
        return returnArray;
    }
}