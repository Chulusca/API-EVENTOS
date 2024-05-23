import PostgreQuery from "../helpers/query-sql-helper.js"
const PQ = new PostgreQuery();


export default class CategoriesRepository{
    GetAllAsync = async () => {
        const sql = `SELECT * FROM tags`
        let response = PQ.PostgreQuery(sql);
        return response.rows;
    }
    GetTagById = async (id) => {
        const sql = `SELECT * FROM tags WHERE id = $1`
        values = [id];
        let response = PQ.PostgreQuery(sql, values);
        return response.rows;
    }
    GetTagByName = async (name) => {
        const sql = `SELECT * FROM tags WHERE name = $1`
        values = [name];
        let response = PQ.PostgreQuery(sql, values);
        return response.rows;
    }
}
