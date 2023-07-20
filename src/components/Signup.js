import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notebookbg from './notebook.png'


const Signup = (props) => {
    
    const [credentials,setCredentials]=useState({name:"",email: "",password: "",cpassword:""})
    const BASE_URL=process.env.REACT_APP_BASE_URL
    let history=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(credentials.password!==credentials.cpassword){
            props.showAlert("Passwords does not match: Re-enter Password","danger")
        }
        else{
        const {name,email,password}=credentials;
        const response=await fetch(`${BASE_URL}/api/auth/createuser`,{
            method:'POST',
            headers:{
              'content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
          });
          const json=await response.json();
          //console.log(json);
          if(json.sucess){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            history("/");
            props.showAlert("Account Created Sucessfully","success")

          }else{
            props.showAlert("Invalid Details: User Already Exists","danger")
          }
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
<section className=" text-center text-lg-start">
  <div className="container py-4">
    <div className="row g-0 align-items-center">
      <div className="col-lg-6">
        <div className="card-body py-5 px-md-5">
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
            <h2>Create an Account</h2>
            <br/>
            <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" placeholder='Name'/>
            </div>
            <div className="form-outline mb-4">
            <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" placeholder='Email Address'/>
            </div>
            <div className="form-outline mb-4">
            <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={5} required placeholder='Password'/>
            </div>
            <div className="form-outline mb-4">
            <input type="cpassword" className="form-control" name='cpassword' id="cpassword" onChange={onChange} minLength={5} required placeholder='Confirm Password'/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <div className="col-lg-4 mb-4 mb-lg-0">
        <img src={Notebookbg} alt="iNoteBook" className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
      </div>
    </div>
  </div>
</section>
</>
    )
}

export default Signup
