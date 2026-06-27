import './Signin.css';
import {  useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
        "https://techkart-backend-7.onrender.com/api/signin/",{
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
  By continuing, you agree to TechKart{" "}
  <Link to="/aboutus" className="terms-link">
    Conditions of Use
  </Link>{" "}
  and{" "}
  <Link to="/aboutus" className="terms-link">
    Privacy Conditions
  </Link>.
</p>

  </div>
</div>
    )
  }