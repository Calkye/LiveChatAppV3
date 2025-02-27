import './Css/SideBar.css'

import Settings from './Settings/Settings.jsx'
import Search from './Search.jsx'; 
import DirectMessages from './DirectMessages.jsx';
import PinnedMessages from './PinnedMessages.jsx';

const SideBar = ()=>{
  return (
    <div className="SideBar">
      <div className="Chat-Container">
        <div className="Chats">
          <div className="Heading-Settings">
            <h2>Chats</h2>
            <Settings />
          </div>
          <div className="Search-Container">
            <Search />
          </div>
        </div>
      </div>
      <div className="PinnedMessages-Container">
        <PinnedMessages />
      </div>    
      <div className="DirectMessages-Container">
        <DirectMessages />
      </div> 
    </div>
  )
}

export default SideBar; 