export default class ValidacionesHelper{

    ValidarEmail = (email) => {
        const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$/;
        return regex.test(email);
    }

}