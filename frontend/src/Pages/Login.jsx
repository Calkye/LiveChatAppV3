import './Css/SignUp.css'

import { useContext } from 'react';
import { UserContext } from '../ContextApi/UserContextApi.jsx';
import { FriendContext } from '../ContextApi/FriendContextApi.jsx';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import User from '../Lib/User.js'; 

const Login = () => {
  const navigate = useNavigate(); 
  const { Username, setUsername, LoginStatus, setLoginStatus, password, setPassword} = useContext(UserContext)
  const {clientUsername, setClientUsername } = useContext(FriendContext); 

  const [username, setTempUsername ] = useState(''); 
  const [ tempPassword, setTempPassword ] = useState(''); 

  const HandleLogin = async(e)=>{
    e.preventDefault(); 
    const user = new User(username, tempPassword); 
    const isSuccess = await user.Login();
    if(isSuccess.Success){ 
      setLoginStatus(true); 
      setUsername(username); 
      setClientUsername(username); 
      setPassword(tempPassword); 
      
      navigate('/MainApp', {replace: true})

    } 
    
  }


  return (
    <>
      <div className="Form-Wrapper">
      <div className="Background" />
      <form className="Form" onSubmit={HandleLogin}>
        <div className="Input-Container">
          <div className="input">
            <label>Username</label>
            <input type="text" value={username} onChange={(e)=>setTempUsername(e.target.value)}/>
          </div>
          <div className="input">
            <label>Password</label>
            <input type="password" value={tempPassword} onChange={(e)=>setTempPassword(e.target.value)}/>
          </div>
        </div>
        <div className="Button-Container">
          <div className="Button">
            <button>Sign in</button>
            <h4><Link to="/">Or Sign up</Link></h4>
          </div>
        </div>
      </form>
    </div>
    
    </>
  )
}

export default Login;
