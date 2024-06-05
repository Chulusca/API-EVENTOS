import UsersRepository from '../repositories/users-repository.js'
import AuthService from './auth-service.js';
import Users from '../entities/users.js';
import ValidacionesHelper from '../helpers/validaciones-helper.js';

export default class UsersService{

    Login = async (username, password) => {
        let returnObject = {
            success: false,
            message: "Error de login",
            token: ""
        }
        
        const repo = new UsersRepository();
        const auth = new AuthService();

        let objeto = await repo.GetByUsername(username);
       
        if (objeto != null){
            if(objeto.password === password){
                returnObject.success = true;
                returnObject.message = "Login Correcto";
                returnObject.token = await auth.Login(objeto);
            }
            else{
                returnObject.message = "Contraseña incorrecta";
            }
        }
        else{
            returnObject.message = "Usuario no encontrado";
        }
        return returnObject;

    }

    Register = async (user) => {
        const repo = new UsersRepository();
        const VH = new ValidacionesHelper();
        let response;
        if (user.first_name.length < 3 || user.last_name.length < 3 || user.password.length < 3){       
            response = "El nombre, el apellido o la contraseña tienen menos de 3 caracteres.";
        }
        else if (!VH.ValidarEmail(user.username)){
            response = "El username no es valido";
        }
        else{
            response = repo.CreateUser(user);
        }
        return response;
    }
}