import TagsRepository from '../repositories/tags-repository.js'

export default class TagsService{
    getAllAsync = async () =>{
        const repo = new TagsRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
    getTagById = async (id) =>{
        const repo = new TagsRepository();
        const returnArray = await repo.getTagById(id);
        return returnArray;
    }
    getTagByName = async (name) =>{
        const repo = new TagsRepository();
        const returnArray = await repo.getByName(name);
        return returnArray;
    }
}