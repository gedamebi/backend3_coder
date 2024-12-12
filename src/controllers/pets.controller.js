import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";

const getAllPets = async(req,res)=>{
    try {
        const pets = await petsService.getAll();
        res.send({status:"success",payload:pets})  
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la consulta de getAllPets ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }   
}

const createPet = async(req,res)=> {
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
    try {
        const result = await petsService.create(pet);
        res.send({status:"success",payload:result})
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la creacion de Pet ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    } 
}

const updatePet = async(req,res) =>{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    try {
        const result = await petsService.update(petId,petUpdateBody);
        res.send({status:"success",message:"pet updated"})
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la actualizacion de Pet ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }
}

const deletePet = async(req,res)=> {
    const petId = req.params.pid;
    try {
        const result = await petsService.delete(petId);
        res.send({status:"success",message:"pet deleted"});
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la eliminacion de Pet ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }
}

const createPetWithImage = async(req,res) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    try {
        const result = await petsService.create(pet);
        res.send({status:"success",payload:result})
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la creacion de Pet ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }
}
export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}