import CategoriesRepository from '../repositories/categories-respository.js';

class CategoriesService{
    
    getAllAsync = async () => {
        const repo = new CategoriesRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getCategorieById = async (id) => {
        const repo = new CategoriesRepository();
        const returnArray = await repo.getCategorieById(id);
        return returnArray;
    }
}

export default CategoriesService;