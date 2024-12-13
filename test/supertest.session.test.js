import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://127.0.0.1:8080');

describe('Testing Adoptme Api', () => {

    describe('Test de Sessions', () => { 

        const user = {
            first_name: "German",
            last_name: "Medina",
            email: "pruebagerman7@gmail.com",
            phone: 12312312 ,
            age: 33,
            password: 'prueba7',
        };

        it('Debe registrar un usuario', async function () { 
            const response = await requester.post('/api/sessions/register').send(user);
            expect(response.status).to.equal(200); 
        });

        it('Usuario ya registrado', async function () { 
            const response = await requester.post('/api/sessions/register').send(user);
            expect(response.status).to.equal(400); 
        });


        it('Debe loggear un user y devolver una COOKIE', async () => { 
            let cookie = {}
            const response = await requester.post('/api/sessions/login').send({
                email: "pruebagerman7@gmail.com",
                password: 'prueba7'
            });

            const cookieResult = response.headers['set-cookie'][0]
            expect(cookieResult).to.be.ok
            const { 0: nameCookie, 1: valueCookie } = cookieResult.split('=');
            cookie = {
                name: nameCookie,
                value: valueCookie
            }
            expect(cookie.name).to.be.ok.and.eql('coderCookie')
            expect(cookie.value).to.be.ok
        }); 
    });
});