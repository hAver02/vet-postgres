
const userModel = require("../model/user.model.js");
const petModel = require('../model/pet.model.js');

const getAll = async (req, res) => {
    const { limit, page } = req.query;
    
    try {
        const count = await petModel.count();
        const data = await petModel.getAll(limit, page);

        const totalPages = Math.ceil(count / limit);
        const nextPage = (Number(page) + 1 > totalPages) ? null : Number(page) + 1;

        return res.json({ ok : true, pets : data, pagination : { totalPets: count, totalPages, nextPage : nextPage } })
    } catch (error) {
        return res.json({ ok : false, msg : 'Error getting pets'})
    }
}

const getPetsByUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const data = await petModel.getPetsByUserID(userId)
        return res.json({ ok : true, pets : data})
    } catch (error) {
        console.log(error);
        return res.json({ ok : false, msg : 'Error getting pets'})
    }
}

const createPet = async(req, res ) => {
    const {name, specie, breed, owner} = req.body;
    if(!name || !specie || !breed || !owner ) return res.json({ ok : false, msg : "Bad request!"});
    try {
        const user = await userModel.findById(owner);

        if(!user) return res.json({ ok : false, msg : 'Owner invalid'})

        const data = await petModel.createPet(name, specie, breed, owner);
        return res.json({ ok : true, msg : "pet created succesfully!", pet : data})
    } catch (error) {
        return res.json({ ok : false, error : 'Error creating pet'})
    }
}

const deletePet = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await petModel.deletePet(id);
        if(!data || data.rowCount == 0) return res.json({ ok : false, msg : 'Error deleting pet'})
        return res.json({ ok : true, msg : "Pet deleted succesfully!"})
    } catch (error) {
        console.log(error);
        return res.json({ ok : false, msg : 'Error deleting pet'})
    }
}

const updateInfoPet = async(req, res) => {
    const { id } = req.params;
    let {name, species,breed } = req.body
    if( !name && !species && !breed) return res.jon({ ok : false, msg : 'Invalid information. Bad request!'})
    try {  
        const data = await petModel.getById(id);
        if(data.length == 0 || data.length > 1) return res.json({ ok : false, msg : "Dont exist this pet id"})
        const [ currentPet ] = data;

        name = name || currentPet.name;
        species = species || currentPet.species;
        breed = breed || currentPet.breed;

        const rta = await petModel.updateInfoPet(id, name, species, breed);
        if(!rta || rta.rowCount == 0 ) return res.json( { ok : false, msg : 'Smt was wrong!'})
        res.json({ ok : true, msg : 'Pet updated sucesfully!'})
    } catch (error) {
        res.json({ ok : false })
    }
}

module.exports =  { getAll, getPetsByUser, createPet, deletePet, updateInfoPet  }