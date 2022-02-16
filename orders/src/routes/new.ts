import { requireAuth, validateRequest } from '@toyosi-organiza/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .withMessage('Ticket id must tbe provided')
], validateRequest, async (req: Request, res: Response) => {
    res.send({});

})

export { router as newOrderRouter};