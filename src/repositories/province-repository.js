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

    getProvinceById = async (id) =>{
        let returnArray = null;
        const client = new Client(config);
        try{
            await client.connect();
            const sql = `SELECT * FROM provinces WHERE id=$1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        }
        catch (error){
            console.log(error);
        }
        return returnArray;
    }

}