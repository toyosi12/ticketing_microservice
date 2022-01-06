import express from 'express';
import 'express-async-errors';
import { errorHandler, NotFoundError, currentUser } from '@toyosi-organiza/common';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);


app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorHandler);

export { app };