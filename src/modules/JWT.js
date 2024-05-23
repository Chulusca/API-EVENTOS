import jwt from 'jsonwebtoken';

const secretKey = 'ThiagoPajachiTomasCzernuszkyLucasNegro$';
const options = {
    expiresIn: '1h',
    issuer: 'TLT'
}

class JSONWebToken{
    generateJWT(objeto){
        const token = jwt.sign(objeto, secretKey, options);
        return token;
    }
    
    decriptJWT(token){
        try{
            //Terminar funcion
        }
        catch(e){

        }
    }

}

export default JSONWebToken;