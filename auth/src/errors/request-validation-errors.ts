import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError{
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        //this is never sent to the user, it is just for logging purposes
        super('Invalid request parameters');

        //You need to call this when you are extending a built in class in typescript
        Object.setPrototypeOf(this, RequestValidationError.prototype);
         
    }

    serializeErrors(){
        return this.errors.map(err => {
            return { message: err.msg, field: err.param };
        })
    }
}
