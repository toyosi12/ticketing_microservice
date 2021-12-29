import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-errors';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required')
    ], 
    validateRequest,  
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
 
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            throw new BadRequestError('Invalid credentials')
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);
        if(!passwordsMatch){
            throw new BadRequestError('Invalid Credentials');
        }

        //generate jwt
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, 
        process.env.JWT_KEY! //the JWT_KEY is coming from the secret created in the pod
        );


        //store on session object
        req.session = {
            jwt: userJwt
        }

        return res.status(201).send(existingUser);


});

export { router as signinRouter };