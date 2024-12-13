import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://127.0.0.1:8080');

describe('Testing Adoptme Api', () => {

    describe('Test de Adoption', () => { 

        let pet = {}
        let adoptme = {}

        it('deberia de crear correctamente una mascota en /api/pets [POST]', async () => {
            const mockPet = {
                name: 'Firulai2',
                specie: 'Caniche2',
                birthDate: '2022-01-01'
            }
            const { statusCode, ok, _body } = await requester.post('/api/pets/').send(mockPet)
            expect(statusCode).to.be.eq(200)
            expect(ok).to.be.eq(true)
            expect(_body.payload).to.have.property('_id')
            pet = _body.payload
        }) 

        it('deberia adoptar el pet recien creado /api/adoptions/:uid/:pid [POST]', async () => {
            const { statusCode, ok, _body } = await requester.post(`/api/adoptions/675b997895db94fd8052eb60/${pet._id}`).send()
            expect(statusCode).to.be.eq(200)
            expect(ok).to.be.eq(true)
            expect(_body.payload).to.have.property('_id')
            adoptme = _body.payload
        })

        it('Obtengo la adopcion recien realizada /api/adoptions/:aid [GET]', async () => {
            const { statusCode, ok } = await requester.get(`/api/adoptions/${adoptme._id}`).send()
            expect(statusCode).to.be.eq(200)
            expect(ok).to.be.eq(true)
        })

        it('Obtengo todas las adopciones realizada /api/adoptions/ [GET]', async () => {
            const { statusCode, ok, _body } = await requester.get(`/api/adoptions/`).send()
            expect(statusCode).to.be.eq(200)
            expect(ok).to.be.eq(true)
            expect(Array.isArray(_body.payload)).to.be.eq(true);
        })
    });
});