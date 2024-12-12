import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    try {
        const users = await usersService.getAll();
        res.send({status:"success",payload:users})
    } catch (error) {
        const currentDate = new Date();
        req.logger.warning('Error en obtener todos los usuarios ' + error + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"Error en obtener todos los usuarios"}) 
    }
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    try {
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error",error:"User not found"})
        res.send({status:"success",payload:user})
    } catch (error) {
        const currentDate = new Date();
        req.logger.warning('Error en obtener el usuario ' + error + ' > ' + currentDate.toString())
        res.status(500).send({status:"error",payload:"Error en obtener el usuario"}) 
    }
}

const updateUser = async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    try {
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error", error:"User not found"})
        const result = await usersService.update(userId,updateBody);
        res.send({status:"success",message:"User updated"})
    } catch (error) {
        const currentDate = new Date();
        req.logger.warning('Error en actualizacion de usuario ' + error + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"Error en actualizacion de usuario"}) 
    }
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    try {
        const result = await usersService.getUserById(userId);
        res.send({status:"success",message:"User deleted"})
    } catch (error) {
        const currentDate = new Date();
        req.logger.warning('Error en eliminacion de usuario ' + error + ' > ' + currentDate.toString())
        res.send({status:"error",payload:"Error en eliminacion de usuario"}) 
    }
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}