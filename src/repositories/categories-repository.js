import PostgreQuery from "../helpers/query-sql-helper.js"

const PQ = new PostgreQuery();

export default class CategoriesRepository{
    
    getAllAsync = async () => {
        const sql = `SELECT * FROM event_categories order by display_order ASC`
        let returnArray = await PQ.PostgreQuery(sql);
        return returnArray;
    }
    
    getCategoryById = async (id) => {
        const sql = `SELECT * FROM event_categories WHERE id=$1`;
        const values = [id];
        let returnArray = await PQ.PostgreQuery(sql, values);
        return returnArray;
    }
    insertCategory = async (category) => {
        const sql = `INSERT INTO public.event_categories (name, display_order)
                    VALUES ($1, $2)`
        const values = [category.name, category.display_order];
        const result = await PQ.PostgreQuery(sql, values);
        if(result != null){
            return true;
        }
        else{
            return false;
        }
    }
    updateCategory = async (category) => {
        
    }
}