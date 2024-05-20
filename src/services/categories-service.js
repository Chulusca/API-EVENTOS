import CategoriesRepository from '../repositories/categories-respository.js';

export default class CategoriesService{
    
    getAllAsync = async () => {
        const repo = new CategoriesRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
}