import {Router} from 'express';
import ProvinceService from '../services/province-service.js'
import Province from '../entities/province.js';

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

router.post('', async(req,res) => {
    let respuesta;
    respuesta = await svc.insertProvince(new Province(1, req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order));
    if(respuesta){
        respuesta = res.status(201).send("Provincia creada correctamente");
    }
    else{
        respuesta = res.status(400).send("Error interno.");
    }
    return respuesta;
});

router.put('', async(req,res) => {
    let respuesta;
    respuesta = await svc.updateById(new Province(req.body.id, req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order));
    if(respuesta){
        respuesta = res.status(201).send("Provincia actualizada correctamente");
    }
    else if(!respuesta){
        respuesta = res.status(404).send("Provincia no encontrada.");
    }
    else{
        respuesta = res.status(400).send("Bad Request")
    }
    return respuesta;
});

router.delete('/:id', async(req,res) => {
    let respuesta;
    respuesta = await svc.deleteProvinceById(req.params.id);
    if(respuesta){
        respuesta = res.status(200).send("Eliminado correctamente.");
    }
    else if(respuesta == null){
        respuesta = res.status(401).send("No hay autorizacion para eliminar esa provincia.")
    }
    else{
        respuesta = res.status(404).send("No se encontro la provincia.");
    }
    return respuesta;
});

export default router;