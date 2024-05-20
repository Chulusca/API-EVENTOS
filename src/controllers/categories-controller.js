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

export default router;