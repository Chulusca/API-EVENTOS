class Object{
    status;
    message;
    code;
    JSONcontent;
    
    constructor(){
        this.status = null;
        this.message = null;
        this.code = null;
        this.JSONcontent = null;
    }

    static negarObjeto(mensaje){
        const obj = new Object();
        obj.status = false;
        obj.message = mensaje;
        obj.code = 400;
        obj.JSONcontent = null;
        return obj;
    }
}

export default Object;