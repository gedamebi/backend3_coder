import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://127.0.0.1:8080');

describe('Testing Adoption Api', () => {

    describe('Test de Sessions', () => { 

        it('Debe registrar un usuario', async function () { 
            this.timeout(5000); 

            const user = {
                first_name: "German",
                last_name: "Medina",
                email: "pruebagerman7@gmail.com",
                phone: 12312312 ,
                age: 33,
                password: 'prueba7',
            };

            try {
                const response = await requester.post('/api/sessions/register').send(user);
                expect(response.status).to.equal(200); 
            } catch (error) {
                throw error;
            }
        });


        it('Debe loggear un user y devolver una COOKIE', async () => { 
            const result = await requester.post('/api/sessions/login').send({
                email: "pruebagerman7@gmail.com",
                password: 'prueba7'
            });

            const cookieResult = result.headers['set-cookie'][0];
            expect(cookieResult).to.be.ok;
            expect(cookieResult.split('=')[0]).to.be.eql('coderCookie');
            expect(cookieResult.split('=')[1]).to.be.ok;
        }); 
    });
});