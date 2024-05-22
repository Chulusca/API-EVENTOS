import config from "../configs/dbconfig.js";
import pkg from 'pg';
const {Client} = pkg;

export default class PostgreQuery{

    async PostgreQuery(query, values = undefined){
        let returnArray = null;
        const client = new Client(config);
        try{
            await client.connect(); // Connect with sql client.
            const result = await client.query(query, values);
            returnArray = result;
        }
        catch(error){
            console.log(error);
        }
        finally{
            await client.end();
            return returnArray;
        }
    }

}