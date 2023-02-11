import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email, password} = credentials
    // Add a Notes
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email, password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('tocken', json.awthtocken);
      navigate('/Login');
      props.showAlert("Account Created Successfully",'success');
    } else {
      props.showAlert("Invalid Cridentials!!!!",'danger');
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container mt-3">
      <h3>Sign Up Form</h3>
      <p className="text-warning bg-success text-center">Fill Your Details For Sign Up</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" value={credentials.name} placeholder="Enter username" name="name" minLength={5} required onChange={onChange}/>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" value={credentials.email} placeholder="Enter email" name="email" required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" value={credentials.password} placeholder="Enter password" name="password" minLength={6} required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password:</label>
          <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} placeholder="Enter password again" minLength={5} name="cpassword" required onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
