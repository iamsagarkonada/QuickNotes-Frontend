import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notebookbg from './notebook.png'

const Login = (props) => {
    const [credentials,setCredentials]=useState({email: "",password: ""})
    const BASE_URL=process.env.REACT_APP_BASE_URL
    let history=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(`${BASE_URL}/api/auth/login`,{
            method:'POST',
            headers:{
              'content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          //console.log(json);
          if(json.sucess){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Sucessfully","success")
            history("/");
            

          }
          else{
            props.showAlert("Invalid Crentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>
<section className=" text-center text-lg-start">
  <div className="container py-3">
    <div className="row g-0 align-items-center">
      <div className="col-lg-4 d-lg-flex">
        <img src={Notebookbg} alt="iNoteBook"
          className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
      </div>
      <div className="col-lg-6">
        <div className="py-5 px-md-5">
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
            <h2>Login to Continue</h2>
            <br/>
            <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email"aria-describedby="emailHelp" placeholder='Email Address' />
            </div>
            <div className="form-outline mb-4">
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' placeholder='Password'/>
            </div>
            <div className="row mb-4">
              <div className="col d-flex ">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="form2Example31"/>
                  <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</>
    )
}

export default Login
