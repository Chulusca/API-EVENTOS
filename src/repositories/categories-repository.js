import PostgreQuery from "../helpers/query-sql-helper.js"

const PQ = new PostgreQuery();

export default class CategoriesRepository{
    
    getAllAsync = async () => {
        const sql = `SELECT * FROM event_categories order by display_order ASC`;
        let returnArray = await PQ.PostgreQuery(sql);
        return returnArray.rows;
    }
    
    getCategoryById = async (id) => {
        const sql = `SELECT * FROM event_categories WHERE id=$1`;
        const values = [id];
        let returnArray = await PQ.PostgreQuery(sql, values);
        return returnArray.rows;
    }
    insertCategory = async (category) => {
        const sql = `INSERT INTO public.event_categories (name, display_order)
                    VALUES ($1, $2)`;
        const values = [category.name, category.display_order];
        const result = await PQ.PostgreQuery(sql, values);
        if(result.rowCount != 0){
            return true;
        }
        else{
            return false;
        }
    }
    updateCategory = async (category) => {
        const sql = `UPDATE public.event_categories
                    SET "name" = $1, "display_order" = $2
                    WHERE id = $3`;
        const values = [category.name, category.display_order, category.id];
        const result = await PQ.PostgreQuery(sql, values);
        if(result.rowCount != 0){
            return true;
        }
        else{
            return false;
        }
    }
    deleteCategory = async (id) => {
        const sql = `DELETE FROM event_categories where id = $1`;
        const values = [id];
        const result = await PQ.PostgreQuery(sql, values);
        if(result.rowCount != 0){
            return true;
        }
        else{
            return false
        }
    }
}   