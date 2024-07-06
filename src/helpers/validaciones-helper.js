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
    //console.log(vh.EsNumero(20)); true
    //console.log(vh.EsNumero('hola')); false
    //console.log(vh.EsNumero('20')); false
    //console.log(vh.EsNumero(-34.2223)); true
    //console.log(vh.EsNumero(34.2224)); true
}   