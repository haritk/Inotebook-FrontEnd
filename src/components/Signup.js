import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const host = 'http://localhost:8080/auth'
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "", cpassword:"" });
  let navigate = useNavigate();
  const onChange = (e) => {
    //target ki property name waali field mein e ke target ki value daal do
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    console.log("hi");
    e.preventDefault();
    try {
      const {name,email,password,cpassword}= credentials;
      const response = await fetch("http://localhost:8080/auth/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name,email,password })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //save auth token and redirect
        //history hook is used for redirectign
        navigate('/');
      } else {
        alert('user exists');
      }
    } catch (e) {
      console.log(e);
    }

  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">name</label>
        <input type="text" className="form-control" id="name" value={credentials.name} name="name" onChange={onChange} aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" required minLength={5} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onChange} name="cpassword" required minLength={5} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup