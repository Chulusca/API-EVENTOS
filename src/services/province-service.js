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
    insertProvince = async (province) =>{
        const repo = new ProvinceRepository();
        const response = await repo.insertProvince(province);
        return response;
    }
    updateById = async (province) => {
        const repo = new ProvinceRepository();
        const response = await repo.updateById(province);
        return response;
    }
    deleteProvinceById = async (id) =>{
        const repo = new ProvinceRepository();
        const returnArray = await repo.deleteProvinceById(id);
        return returnArray;
    }

}