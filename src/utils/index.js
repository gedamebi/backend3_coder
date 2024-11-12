import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import { fakerDE as faker} from '@faker-js/faker'

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

export const generateUsers = async (count) => {

    const users = []
    for (let i=0; i<=count; i++){

        //const passwordHash = await createHash('coder123')

        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: await createHash('coder123'),
            role: i % 3 === 0 ? 'admin' : 'user',
            pets: []
        }
        users.push(user)
    }
    return users
}


export const generatePets = (count) => {

    const pets = []
    for (let i=0; i<=count; i++){

        const pet = {
            name: faker.animal.petName(),
            specie: faker.animal.type(),
            adopted: false,
        }
        pets.push(pet)
    }
    return pets
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;