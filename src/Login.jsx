import './Login.css';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from './context/Usercontext';

export default function Login() {

  const navigate = useNavigate();
  const{
      email,
      setEmail,
      password,
      setPassword
    }   = useContext(Usercontext)  

  const login = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/login/",
      {
        email,
        password
      }
    );

    localStorage.setItem("user_id", response.data.user_id);
    console.log(response.data);
          toast.success("Login Successful", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              theme:"colored"
            });
            navigate('/')
  } 
  catch (error) {
    console.log(error.response?.data);
       toast.warning('Login failed!', {
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
};

    return(
        <div className="login-container">
  <div className="login-card">

    <h1>TechKart Account</h1>

    <h2>Log In</h2>

    <input className="email-inp" type="email" 
    placeholder="Email" 
    value={email}
    onChange={(e)=>setEmail(e.target.value)} />

    <input className="password-inp" type="password"
     placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}/>

    <button className="login-btn"
    onClick={login}>Log In</button>

    <p className="terms">
      By continuing, you agree to Techkart <a >Conditions of Use</a> and <a >Privacy Conditions</a>.
    </p>

  </div>
</div>
    )
}