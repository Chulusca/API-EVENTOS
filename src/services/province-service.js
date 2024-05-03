import ProvinceRepository from '../repositories/province-repository.js'

export default class ProvinceService{

    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
    getProvinceById = async (id) =>{
        const repo = new ProvinceRepository();
        const returnArray = await repo.getProvinceById(id);
        return returnArray;
    }

}