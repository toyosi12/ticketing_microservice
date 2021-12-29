import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@user.com',
            password: 'toyosioye'
        })
        .expect(201);
});

it('fails when an email that does not exist is supplied', async() => {
    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@user.com',
        password: 'toyosioye'
    })
    .expect(400);
})

it('fails when an incorrect password is supplied', async() =>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@user.com',
            password: 'toyosioye'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@user.com',
            password: 'jasdfasdf'
        })
        .expect(400)
})

it('responds with a cookie when given valid data', async() =>{
const cookie = await global.signin();//defined in setup.ts
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@user.com',
            password: 'toyosioye'
        })
       .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})
