import './Css/SignUp.css'

import { useState } from 'react';
import { Link } from 'react-router-dom';

import User from '../Lib/User.js'; 

const SignUp = () => {
  const [username, setUsername ] = useState(''); 
  const [ password, setPassword ] = useState(''); 

  const HandleSignup = async(e)=>{
    e.preventDefault(); 
    const NewUser = new User(username, password); 
    const isSuccessFull = NewUser.CreateAccount();
    if(isSuccessFull.Success){ 
      setUsername(''); 
      setPassword(''); 
      console.log('Sign up Successful'); 
    } 
  }


  return (
    <div className="Form-Wrapper">
      <div className="Background" />
      <form className="Form" onSubmit={HandleSignup}>
        <div className="Input-Container">
          <div className="input">
            <label>Username</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className="input">
            <label>Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="Button-Container">
          <div className="Button">
            <button>Create Account</button>
            <h4><Link to="/Login">Or Login</Link></h4>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
