import jwt from '../modules/JWT.js'

const jsonToken = new jwt();

export default class AuthService{
    
    Login = async (payload) => {
        const token = await jsonToken.generateJWT(payload);
        return token;
    }

}