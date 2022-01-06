import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { validateRequest, BadRequestError } from '@toyosi-organiza/common';
const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid!'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
], 
validateRequest,
async (req: Request, res: Response) => {
    
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if(existingUser){
        throw new BadRequestError('Email already exists');
    }

    const user = User.build({ email, password });
    await user.save();

    //generate jwt
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, 
    process.env.JWT_KEY! //the JWT_KEY is coming from the secret created in the pod
    );


    //store on session object
    req.session = {
        jwt: userJwt
    }

    
    res.status(201).send(user);
});

export { router as signupRouter };