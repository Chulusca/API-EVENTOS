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
        const query = 'SELECT COUNT(*) FROM $1 WHERE id = $2';
        values = [id, tabla];
        let response = sql.PostgreQuery(query, values);
        return result.rows[0].count > 0;
    }

    ValidarNumero = async (numero) =>{
        let returnValue;
        //Terminar funcion
    }

}   