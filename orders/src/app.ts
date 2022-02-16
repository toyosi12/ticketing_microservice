import express from 'express';
import 'express-async-errors';
import { errorHandler, NotFoundError, currentUser } from '@toyosi-organiza/common';
import cookieSession from 'cookie-session';
import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';


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

/**
 * Has to come after cookiesession middleware
 */
app.use(currentUser);

app.use(deleteOrderRouter)
app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(indexOrderRouter)


app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorHandler);

export { app };