import {Router} from 'express';
import ProvinceService from '../services/province-service.js'

const router = Router();
const svc = new ProvinceService();

router.get('', async(req,res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if(returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else{
        respuesta = res.status(500).send("Error interno.");
    }
    return respuesta;
});

router.get('/:id', async(req,res) => {
    let respuesta;
    const returnArray = await svc.getProvinceById(req.params.id);
    if(returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else{
        respuesta = res.status(500).send("Error interno.");
    }
    return respuesta;
});

export default router;