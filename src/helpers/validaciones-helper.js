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

}   