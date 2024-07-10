import querySqlHelper from './query-sql-helper.js'
const sql = new querySqlHelper();

export default class ValidacionesHelper{

    ValidarEmail = (email) => {
        const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$/;
        return regex.test(email);
    }

    ValidarCadena = (cadena, minCaracteres) => {
        if (cadena.trim().length === 0 || cadena.length < minCaracteres) {
            return false;
        } else {
            return true;
        }
    }

    ValidarEntero = (int) => {
        if (isNaN(int)) {
            return 1;
        }
        return int;
    }

    ValidarID = async (id, tabla) => {
        const query = 'SELECT COUNT(*) FROM ' + tabla + ' WHERE id = $1';
        let values = [id];
        let response = await sql.PostgreQuery(query, values);
        return response.rows[0].count > 0;
    }
    EsNumero = async (numero) =>{
        return typeof numero === 'number' && !Number.isNaN(numero);
    }

    EventoTermino = async (id) => {
        const fechaActual = new Date().toISOString();
        const query = 'select start_date from events where id = $1';
        const values = [id];
        let response = await sql.PostgreQuery(query, values);

        if (response.rows.length > 0) {
            const startDate = response.rows[0].start_date;
            const fechaInicioEvento = new Date(startDate);
            const fechaActualObj = new Date(fechaActual);
            if (fechaActualObj >= fechaInicioEvento) {
                return true;
            }
        }
        return false;

    }
    EnableEnrollment = async (id) => {
        const query = 'select enabled_for_enrollment from events where id = $1';
        const values = [id];
        let response = await sql.PostgreQuery(query, values);
        
        if(response.rows.enabled_for_enrollment = 1){
            return true;
        }
        else{
            return false;
        }
    }
    EventIsFull = async (id) => {
        let query = 'select count(*) from event_enrollments where id_event = $1';
        const values = [id];
        let cantidadDeEnrollments = await sql.PostgreQuery(query, values);
        cantidadDeEnrollments = cantidadDeEnrollments.rows[0].count;
        query = 'select max_assistance from events where id = $1';
        let max_assistance = await sql.PostgreQuery(query, values);
        max_assistance = max_assistance.rows[0].count;
        if(max_assistance == cantidadDeEnrollments){
            return true;
        }
        else{
            return false;
        }
    }
    UserAlreadyEnroll = async (idEvento, idUsuario) => {
        const query = `select count(*) from event_enrollments where id_user = $1 and id_event = $2`;
        const values = [idUsuario, idEvento];
        let cantidadDeEnrollments = await sql.PostgreQuery(query, values);
        cantidadDeEnrollments = cantidadDeEnrollments.rows[0].count;
        if(cantidadDeEnrollments > 1){
            return true;
        }
        else{
            return false;
        }
    }
    
}   