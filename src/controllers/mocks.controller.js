import { usersService, petsService } from "../services/index.js"
import { generateUsers, generatePets } from '../utils/index.js'

const getMockingPets = async(req,res)=>{
    const { count } = req.query
    if (!count || !Number(count)){
        return res.status(404).send({status:"error", error:"Falta parametro en la consulta"})
    }
    const pets = generatePets(count)
    res.status(201).send({status:"success", payload:pets})
}

const getMockingUsers = async(req,res)=>{
    const { count } = req.query
    if (!count || !Number(count)){
        return res.status(404).send({status:"error", error:"Falta parametro en la consulta"})
    }
    const users = generateUsers(count)
    res.status(201).send({status:"success", payload:users})
}

const generateData = async(req,res)=>{
    const { users, pets } = req.body
    if (!users || !Number(users) || !pets || !Number(pets)){
        return res.status(404).send({status:"error", error:"Falta parametro en la consulta"})
    }

    const usersList = await generateUsers(users)
    try {
        
        for (const user of usersList){
            await usersService.create(user)
        }
    } catch (e){
        return res.status(500).send({status:"error", error:"Error al agregar registro a la DB"})
    }

    const petsList = generatePets(pets)
    try {
        for (const pet of petsList){
            await petsService.create(pet)
        }
    } catch (e){
        console.log(e)
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