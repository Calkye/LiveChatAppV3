import './Css/Directmessages.css'; 

import UserInfo from './UserInfo.jsx'; 

const DirectMessages = ({ImageUrl})=>{
  return (
    <div className="DirectMessages">
      <h2 className='Title'>All Chats</h2>
        <UserInfo Username={"User3"} Message={"This is sample data"}/>
        <UserInfo Username={"User4"} Message={"This is sample data"}/>
        <UserInfo Username={"User5"} Message={"This is sample data"}/>

    </div>
  )
}

export default DirectMessages; 