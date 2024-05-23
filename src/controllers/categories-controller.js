import {Router} from "express";
import CategoriesService from '../services/categories-service.js';
import Event_categories from '../entities/event_categories.js';

const router = Router();
const svc = new CategoriesService();

router.get('', async(req,res) => {
    let respuesta; 
    const returnArray = await svc.getAllAsync();
    if(returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else{
        respuesta = res.status(500).send("Error interno");
    }
    return respuesta;
});

router.get('/:id', async (req,res) => {
    let respuesta;
    const returnArray = await svc.getCategoryById(req.params.id);
    if (returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else{
        respuesta = res.status(404).send("No se encontro")
    }
});

router.post('', async(req,res) => {
    let respuesta;
    respuesta = await svc.insertCategory(new Event_categories(1, req.body.name, req.body.display_order));
    if(respuesta){
        respuesta = res.status(201).send("Categoria creada correctamente");
    }
    else{
        respuesta = res.status(400).send("Bad Request");
    }
});

router.put('', async(req,res) =>{
    let respuesta;
    respuesta = await svc.updateCategory(new Event_categories(req.body.id, req.body.name, req.body.display_order));
    if(respuesta === true){
        respuesta = res.status(200).send("Updated");
    }
    else if(respuesta == "invalid"){
        respuesta = res.status(400).send("Invalid Name");
    }
    else{
        respuesta = res.status(404).send("Unable to find category");
    }
});

router.delete('/:id', async(req,res) => {
    let response;
    response = await svc.deleteCategory(req.params.id);
    if(response.success){
        response = res.status(200).send(response.category);
    }
    else{
        response = res.status(404).send("Not found");
    }
});

export default router;