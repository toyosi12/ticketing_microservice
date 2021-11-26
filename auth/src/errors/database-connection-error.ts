import { CustomError } from "../middlewares/custom-error";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor(){
        //this is never sent to the user, it is just for logging purposes
        super('Error connecting to db')

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(){
        return [
            { message: this.reason }
        ]
    }
}