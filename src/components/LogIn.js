import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function LogIn(props) {
    let navigate = useNavigate();
    const[credentials,setCredentials] = useState({email:"", password:""})
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add a Notes
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('tocken',json.awthtocken);
            navigate('/');
            props.showAlert("",'danger');
        }else{
            props.showAlert("Log in successful",'success');
        }
    }
    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value})
       }
    return (
        <div className="container mt-3">
            <h3>Log In Form</h3>
            <p className="text-warning bg-success text-center">Fill Your Details For Log In</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlfor="email" className="form-label">Username:</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} placeholder="Enter username" name="email" required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlfor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} placeholder="Enter password" name="password" required onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}

export default LogIn
