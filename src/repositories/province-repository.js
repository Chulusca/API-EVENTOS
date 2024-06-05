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
            returnArray = result.rows;
        }
        catch (error){
            return false;
        }
        finally {
            await client.end();
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
            returnArray = result.rows;
        }
        catch (error){
            return false;
        }
        finally {
            await client.end();
        }
        return returnArray;
    }
    insertProvince = async (province) => {
        const client = new Client(config);
        try{
            await client.connect();
            const sql = `INSERT INTO public.provinces (name, full_name, latitude, longitude, display_order) 
                        VALUES ($1, $2, $3, $4, $5)`
            const values = [province.name, province.full_name, province.latitude, province.longitude, province.display_order];
            const result = await client.query(sql, values);
            return true;
        }
        catch (error){
            return false;
        }
        finally {
            await client.end();
        }
    }
    updateById = async (province) => {
        const client = new Client(config);
        try{
            await client.connect()
            const sql = `UPDATE public.provinces 
                        SET "name" = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5
                        WHERE id = $6`;
            const values = [province.name, province.full_name, province.latitude, province.longitude, province.display_order, province.id];
            const result = await client.query(sql, values);
            if(result.rowCount == 0){
                return false;
            }
            return true;
        }
        catch (error){
            return false;
        }
        finally {
            await client.end();
        }
    }
    deleteProvinceById = async (id) => { 
        const client = new Client(config);
        try{
            await client.connect();
            //Eliminar provincia.
            const deleteProvinceSql = `DELETE FROM provinces WHERE id = $1`
            const deleteProvinceValues = [id];
            const deleteProvinceResult = await client.query(deleteProvinceSql, deleteProvinceValues);
            if(deleteProvinceResult.rowCount == 0){
                return false;
            }
            return true
        }   
        catch(error){
            return null;
        }
        finally {
            await client.end();
        }
    }
}