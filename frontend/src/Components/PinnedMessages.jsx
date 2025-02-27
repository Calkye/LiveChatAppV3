import './Css/PinnedMessages.css'; 

import UserInfo from './UserInfo.jsx'; 

const PinnedMessages = ()=>{
  return (
    <>
      <div className="PinnedMessages">
        <h2>Pinned Messages</h2>
        <div className="Messages">
        <UserInfo Username={"User1"} Message={"This is sample data"}/>
        <UserInfo Username={"User2"} Message={"This is Sample data"}/>

        </div>
      </div>
    </>
  );
};

export default PinnedMessages; 