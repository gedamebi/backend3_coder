import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async(req,res)=>{
    try {
        const result = await adoptionsService.getAll();
        res.send({status:"success",payload:result})
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la consulta de todas las adoptions ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    try {
        const adoption = await adoptionsService.getBy({_id:adoptionId})
        if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
        res.send({status:"success",payload:adoption})
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la consulta de la adoption ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }
}

const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"user Not found"});
    const pet = await petsService.getBy({_id:pid});
    if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
    user.pets.push(pet._id);
    try {
        await usersService.update(user._id,{pets:user.pets})
        await petsService.update(pet._id,{adopted:true,owner:user._id})
        const result = await adoptionsService.create({owner:user._id,pet:pet._id})
        res.send({status:"success",payload:result})
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la creacion de adoption ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}