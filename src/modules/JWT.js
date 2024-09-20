import jwt from 'jsonwebtoken';

const secretKey = 'ThiagoPajachiTomasCzernuszkyLucasNegro$';
const options = {
    issuer: 'TLT'
}

class JSONWebToken{
    async generateJWT(payload){
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }
    
    async decryptJWT(token){
        try{
            const payload = await jwt.verify(token, secretKey)
            return payload;
        }
        catch(e){
            console.log(e);
        }
    }

}

export default JSONWebToken;