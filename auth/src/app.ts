import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@toyosi-organiza/common';
import cookieSession from 'cookie-session';

const app = express();

//To make express aware it is behind a proxy
//provided by nginx
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        //do no encrypt
        signed: false,

        //to force users to use https except when running tests
        secure: process.env.NODE_ENV != 'test',
    })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorHandler);

export { app };