import './Signin.css';
import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Usercontext } from './context/Usercontext';



export default function Signin() {

  const{
    email,
    setEmail,
    password,
    setPassword
  }   = useContext(Usercontext)  
  const navigate = useNavigate();
  
  const loginuser = async () =>{

    try{
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signin/",{
          email,
          password,
        }
      )
      console.log(response.data);
      toast.success("Signin Successful", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          theme:"colored"
        });
        navigate('/')
    }

    catch(error){
      console.log(error.response?.data)
        toast.warning('Signin failed!', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar:true,
    theme: "colored",
    style: {
      backgroundColor: 'red', 
      color: '#FFFFFF',
      borderRadius: '8px',
    },
    progressStyle: {
      backgroundColor: 'red' 
    }
  });
    }
  }
    return(
        <div className="signin-container">
  <div className="signin-card">

    <h1>TechKart Account</h1>

    <h2>Sign In</h2>

    <input className="email-inp" 
    type="email"
     placeholder="Email"
     value={email}
     onChange={(e)=>setEmail(e.target.value)} />

    <input className="password-inp" 
    type="password" 
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)} />

    <button className="signin-btn"
    onClick={loginuser}>
      Sign In
      </button>

    <p className="terms">
      By continuing, you agree to Techkart <a href="">Conditions of Use</a> and <a href="">Privacy Conditions</a>.
    </p>

  </div>
</div>
    )
  }