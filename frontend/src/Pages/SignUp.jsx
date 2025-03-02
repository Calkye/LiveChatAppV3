import './Css/SignUp.css'

import { useContext } from 'react';
import { UserContext } from '../ContextApi/UserContextApi.jsx';
import { FriendContext } from '../ContextApi/FriendContextApi.jsx';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import User from '../Lib/User.js'; 

const CreateAccount = () => {

  const navigate = useNavigate(); 
  const { Username, setUsername, LoginStatus, setLoginStatus, password, setPassword} = useContext(UserContext)
  const {clientUsername, setClientUsername } = useContext(FriendContext); 

  const [username, setTempUsername ] = useState(''); 
  const [ tempPassword, setTempPassword ] = useState(''); 



  const HandleLogin = async(e)=>{
    e.preventDefault(); 
    const user = new User(username, tempPassword); 
    const isSuccess = await user.CreateAccount();
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
        <form className="Form" onSubmit={HandleLogin}>
          <div className="Input-Container">
            <div className="Input-Login">
              <label>Username</label>
              <input  
              
              type="text"
              value={username}
              onChange={(e)=>setTempUsername(e.target.value)}
              placeholder='Please enter a username'  
              />
            </div>
            <div className="Input-Login">
              <label>Password</label>
              <input 
              type="password" 
              value={tempPassword} 
              onChange={(e)=>setTempPassword(e.target.value)}
              placeholder='Please enter a password'
              />
            </div>
          </div>
          <div className="Button-Login-Container">
            <div className="Button-Login">
              <button>Create Account</button>
              <h3><Link to="/Login" className='Link'>Or Login</Link></h3>
            </div>
          </div>
        </form>
      </div>
      
    </>
  )
}

export default CreateAccount;
