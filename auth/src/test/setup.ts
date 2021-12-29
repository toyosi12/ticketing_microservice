import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
let mongo: any;
beforeAll(async() => {
    process.env.JWT_KEY = 'asdfasdf';
    //connect to db before starting up tests
    mongo = await MongoMemoryServer.create();

    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri)
});

beforeEach(async() => {
    //reset all data before running each test
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }

});

afterAll(async () => {
    //run after all tests are complete
    await mongo.stop();
    await mongoose.connection.close();
})


declare global {
    var signin: () => Promise<string[]>;
  }

global.signin = async () => {
    const email = 'test@user.com';
    const password = 'toyosioye';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;

}