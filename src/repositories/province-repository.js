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
    // INSERT INTO public.provinces (id, "name", full_name, latitude, longitude, display_order) VALUES (2, N'Ciudad Autónoma de Buenos Aires', N'Ciudad Autónoma de Buenos Aires', -34.61444091796875, -58.445877075195312, NULL);
    insertProvince = async (province) => {
        const client = new Client(config);
        try{
            await client.connect();
            const sql = `INSERT INTO public.provinces ("name", full_name, latitude, longitude, display_order) 
                        VALUES ($1, $2, $3, $4, $5)`
            const values = [province.name, province.full_name, province.latitude, province.longitude, province.display_order];
            const result = await client.query(sql, values);
            await client.end();
            return true;
        }
        catch (error){
            console.log(error);
            return false;
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
            await client.end();
            return true;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }
    deleteProvinceById = async (id) => { 
        const client = new Client(config);
        try{
            await client.connect();
            //Identificar registros de location.
            const locationsSql = `SELECT id FROM locations WHERE id_province = $1`;
            const values = [id];
            const locationsResult = await client.query(locationsSql, values);

            //Eliminar registros de localizacion.
            for(const locationRow of locationsResult.rows){
                const locationId = locationRow.id;
                const deleteLocationQuery = `DELETE FROM locations WHERE id = $1`;
                const deleteLocationValues = [locationId];
                await client.query(deleteLocationQuery, deleteLocationValues);
            }
            //Eliminar provincia.
            const deleteProvinceSql = `DELETE FROM provinces WHERE id = $1`
            const deleteProvinceValues = [id];
            const deleteProvinceResult = await client.query(deleteProvinceSql, deleteProvinceValues);
            await client.end();
            return true
        }   
        catch(error){
            console.log(error);
            return false;
        }
    }
}