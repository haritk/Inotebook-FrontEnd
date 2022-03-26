import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const host = 'http://localhost:8080/auth'
    const [credentials, setCredentials] = useState({"email":"", "password": "" });
    let navigate = useNavigate();
    const onChange = (e)=>{
        //target ki property name waali field mein e ke target ki value daal do
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        console.log("hi");
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password:  credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save auth token and redirect
            localStorage.setItem('token',json.authToken);
            console.log(json.authToken);
            //history hook is used for redirectign
            navigate('/');
        }else{
            alert('invalid credentials');
        }
        }catch(e){
            console.log(e);
        }
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value = {credentials.email}name="email" onChange={onChange}  aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value = {credentials.password} onChange={onChange} name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login