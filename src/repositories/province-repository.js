import config from "../configs/dbconfig.js";
import pkg from 'pg';
const {Client} = pkg;

export default class ProvinceRepository{
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(config);
        try{
            await client.connect();
            const sql = `SELECT * FROM provinces`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error){
            console.log(error);
        }
        return returnArray;
    }
}