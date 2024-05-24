import UsersRepository from '../repositories/users-repository.js'
import AuthService from './auth-service.js';
import Users from '../entities/users.js';

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
            console.log(objeto);
            console.log(objeto.password);
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
}