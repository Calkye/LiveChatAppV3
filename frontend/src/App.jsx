import './Css/App.css'

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './ContextApi/UserContextApi.jsx'; 

import SideBar from './Components/SideBar.jsx'
import Messages from './Components/Messages/Messages.jsx'; 
import Input from './Components/Input/Input.jsx'; 

function App() {
  const nagivate = useNavigate(); 
  const {Username, setUsername, LoginStatus, setLoginStatus} = useContext(UserContext); 
  
  useEffect(()=>{
    if(!LoginStatus){
      nagivate('/Login')
    }
  })

  return (
    <>
      <div className="AppContainer">
        <div className="SideBar-Container">
          <SideBar />
        </div>
        <div className="App">
          <div className="Messages-Container">
            <Messages />
          </div>
          <div className="Input-Container">
            <Input />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
