import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { app } from './app'
const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT KEY must be provided');
    }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO URI must be provided');
    }

    if(!process.env.NATS_CLIENT_ID){
        throw new Error('MONGO URI must be provided');
    }

    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('MONGO URI must be provided');
    }

    if(!process.env.NATS_URL){
        throw new Error('MONGO URI must be provided');
    }
    try{
        //the clusterID here(first parameter) refers
        //to the last parameter provided
        //in nats-depl.yaml
        await natsWrapper.connect(
                process.env.NATS_CLUSTER_ID, 
                process.env.NATS_CLIENT_ID, 
                process.env.NATS_URL);
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

            await mongoose.connect(process.env.MONGO_URI);
        }catch(err){
            console.log(err);
        }
    app.listen(3000, () => {
        console.log('Listening on port: 3000!!');
    });
};

start();


