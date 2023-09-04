import request from 'supertest';
import app from '../../app';
import { mongoConnect, mongoDisconnect } from '../../services/mongo';

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect(); 
    });
    
    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
         await request(app).get('/launches')
             .expect(200)
             .expect('Content-Type', /json/)
        });
     });
     
     describe('Test POST /launch', () => {
         test('It should respond with 201 created', async () => {
             const response = await request(app).post('/launches')
                 .send({
                     mission: 'USS Enterprise',
                     rocket: 'NCC 1701-D',
                     target: 'Kepler-62 f',
                     launchDate: 'January 4, 2028'
                 })
                 .expect('Content-Type', /json/)
                 .expect(201);
                 
             expect(response.body).toMatchObject({
                 mission: 'USS Enterprise',
                 rocket: 'NCC 1701-D',
                 target: 'Kepler-62 f',
                 launchDate: new Date('January 4, 2028').toISOString()
             });
         });
         
         test('It should catch missing required properties', async () => {
             const response = await request(app).post('/launches')
                 .send({
                     mission: 'USS Enterprise',
                     rocket: 'NCC 1701-D',
                     launchDate: 'January 4, 2028'
                 })
                 .expect('Content-Type', /json/)
                 .expect(400);
                 
             expect(response.body).toStrictEqual({
                 error: 'Missing required launch property'
             });
         });
         
         test('It should catch invalid dates', async () => {
             const response = await request(app).post('/launches')
                 .send({
                     mission: 'USS Enterprise',
                     rocket: 'NCC 1701-D',
                     launchDate: 'tete',
                     target: 'Kepler-62 f'
                 })
                 .expect('Content-Type', /json/)
                 .expect(400);
                 
             expect(response.body).toStrictEqual({
                 error: 'Invalid launch date'
             });
         });
     });
});
