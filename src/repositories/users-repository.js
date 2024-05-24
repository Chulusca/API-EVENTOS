import PostgreQuery from "../helpers/query-sql-helper.js"
const PQ = new PostgreQuery();

export default class UsersRepository{
    GetAllAsync = async () => {
        const sql = `SELECT * FROM public.users`;
        let response = await PQ.PostgreQuery(sql);
        return response.rows;
    }
    GetById = async (id) => {
        const sql = `SELECT * FROM public.users WHERE id = $1`;
        const values = [id];
        const response = await PQ.PostgreQuery(sql, values);
        return response.rows[0];
    }
    GetByUsername = async (username) => {
        const sql = `SELECT * FROM public.users WHERE username = $1`;
        const values = [username];
        const response = await PQ.PostgreQuery(sql, values);
        return response.rows[0];
    }
    CreateUsername = async (user) => {
        const sql = `INSERT INTO public.users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`
        const values = [user.firs_name, user.last_name, user.username, user.password]
        const response = await PQ.PostgreQuery(sql, values);
        if(result.rowCount != 0){
            return true;
        }
        else{
            return false;
        }
    }
}