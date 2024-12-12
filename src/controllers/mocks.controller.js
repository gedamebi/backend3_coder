import { usersService, petsService } from "../services/index.js"
import { generateUsers, generatePets } from '../utils/index.js'

const getMockingPets = async(req,res)=>{
    const { count } = req.query
    if (!count || !Number(count)){
        return res.status(404).send({status:"error", error:"Falta parametro en la consulta"})
    }
    try {
        const pets = await generatePets(count)
        res.status(201).send({status:"success", payload:pets})
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la creacion de mocking Pet ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }
}

const getMockingUsers = async(req,res)=>{
    const { count } = req.query
    if (!count || !Number(count)){
        return res.status(404).send({status:"error", error:"Falta parametro en la consulta"})
    }
    try {
        const users = await generateUsers(count)
        res.status(201).send({status:"success", payload:users})
    } catch (e){
        const currentDate = new Date();
        req.logger.warning('Error en la creacion de mocking Users ' + e + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"error en la consulta"})  
    }
}

const generateData = async(req,res)=>{
    const { users, pets } = req.body
    const currentDate = new Date();
    if (!users || !Number(users) || !pets || !Number(pets)){
        return res.status(404).send({status:"error", error:"Falta parametro en la consulta"})
    }

    const usersList = await generateUsers(users)
    try {
        
        for (const user of usersList){
            await usersService.create(user)
        }
    } catch (e){
        req.logger.warning('Error en la generacion de Data Users ' + e + ' > ' + currentDate.toString())
        return res.status(500).send({status:"error", error:"Error al agregar registro a la DB"})
    }

    const petsList = await generatePets(pets)
    try {
        for (const pet of petsList){
            await petsService.create(pet)
        }
    } catch (e){
        req.logger.warning('Error en la generacion de Data Pets ' + e + ' > ' + currentDate.toString())
        return res.status(500).send({status:"error", error:"Error al agregar registro a la DB"})
    }
 
    res.status(201).send({
                        status:"success", 
                        payloadUsers:usersList, 
                        payloadPets:petsList
    })
}

export default {
    getMockingPets,
    getMockingUsers,
    generateData
}