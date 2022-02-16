import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

//instead of importing the actual nats-wrapper, use our built fake 
//nats-wrapper for
jest.mock('../nats-wrapper');

 
let mongo: any;
beforeAll(async() => {
    process.env.JWT_KEY = 'asdfasdf';
    //connect to db before starting up tests
    mongo = await MongoMemoryServer.create();

    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri)
});

beforeEach(async() => {
    jest.clearAllMocks();
    
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
    var signin:() => string[];
  }

global.signin = () => {
   // Build a JWT paylod. {id, email} for test purposes
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.gom'
    }

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session Object. { jwt: MY_JWT}
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

   // return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
}