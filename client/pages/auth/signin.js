import { useState } from "react";
import useRequest from '../../hooks/use-request';
import Route from 'next/router';
const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Route.push('/')
    });


    const onSubmit = async (event) => {
        event.preventDefault();

        await doRequest();


    };
    return <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className='form-group'>
            <label>Email Address</label>
            <input className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className='form-group'>
            <label>Password</label>
            <input value={password} onChange={e=> setPassword(e.target.value)} type='password' className='form-control' />
        </div>
        {errors}
        <button className='btn btn-primary'>Sign In</button>
    </form>
}

export default SignIn;