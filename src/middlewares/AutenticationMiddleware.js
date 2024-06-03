import AuthHelper from "../modules/JWT.js"

export default class AutenticationMiddleware {

    RemoveBearerFromHeader = (header) => {
        let returnValue = header;
        if (header && header.startsWith('Bearer ')){
            returnValue = header.slice(7);
        }
        return returnValue;
    }

    AuthMiddleware = async (req, res, next) => {
        let authHeader;
        let payload;
        let rowsAffected = 0;
        let authService;
        let response; 
        authHeader = req.headers.authorization;

        if(!authHeader) {
            response = res.status(401).send('401 Unauthorized, es necesario un token')
        }
        else{
            authHeader = this.RemoveBearerFromHeader(authHeader);
            const authHelper = new AuthHelper();
            payload = await authHelper.decryptJWT(authHeader);

            if(payload != null){
                req.user = payload;
                next();
            }
            else{
                response = res.status(401).send('401 Unauthorized, token invalido');
            }
        }
        return response;
    }
}