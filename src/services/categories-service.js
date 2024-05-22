import CategoriesRepository from '../repositories/categories-repository.js';

class CategoriesService{
    
    getAllAsync = async () => {
        const repo = new CategoriesRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getCategoryById = async (id) => {
        const repo = new CategoriesRepository();
        const returnArray = await repo.getCategoryById(id);
        return returnArray;
    }
    insertCategory = async (category) => {
        const repo = new CategoriesRepository();
        const response = await repo.insertCategory(category);
        return response;
    }
    updateCategory = async (category) => {
        const repo = new CategoriesRepository();
        if (category.name.length < 3 ){
            return "invalid";   
        }
        const response = await repo.updateCategory(category);
        return response;
    }
    deleteCategory = async (id) =>{
        const repo = new CategoriesRepository();
        const response = await repo.deleteCategory(id);
        return response;
    }
}

export default CategoriesService;