import { useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { FriendContext } from "../../ContextApi/FriendContextApi.jsx";
import { UserContext } from "../../ContextApi/UserContextApi.jsx";
import handleAddFriend from "./handleAddFriend.js";
import GetFriendRequests from "./GetFriendRequests.js";
import settings from "../../../public/Settings.svg";
import "./Css/Settings.css";

const Settings = () => {
  const [modal, setModal] = useState(false);
  const [friendsModal, setFriendsModal] = useState(false);

  const { addedUsernames, setAddedUsernames } = useContext(FriendContext);
  const { Username, password } = useContext(UserContext);

  const [tempFriendUsername, setTempFriendUsername] = useState("");
  const [requestsSampleData, setRequestsSampleData] = useState([""]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000/friends");

    newSocket.on("connect", () => console.log("Connected:", newSocket.id));
    newSocket.on("disconnect", () => console.log("Disconnected from server"));

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);



  useEffect(() => {
    if (!socket) return;
  
    const interval = setInterval(() => {
      GetFriendRequests(socket, Username, setRequestsSampleData);
    }, 5000);
  
    return () => clearInterval(interval);
  }, [socket, Username]);
  

  return (
    <>
      <img
        src={settings}
        alt="Settings Wheel"
        className="btn-modal"
        onClick={() => {
          setModal((prevModal) => !prevModal);
        }}
      />

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <div className="Settings">
                <div className="Top">
                  <img
                    className="Close-modal"
                    src={settings}
                    alt="Settings"
                    onClick={() => {
                      setModal((prevModel) => !prevModel);
                    }}
                  />
                </div>
                <div className="Options">
                  <ul>
                    <li
                      onClick={() => {
                        setFriendsModal((prevModal) => !prevModal);
                      }}
                    >
                      Add Friend
                    </li>
                    <li>Button</li>
                    <li>Button</li>
                    <li>Button</li>
                  </ul>
                </div>
              </div>
              <div className="Content">
                {friendsModal && (
                  <div className="Friends-Content-Container">
                    <div className="Friends-Add">
                      <input
                        type="text"
                        value={tempFriendUsername}
                        onChange={(e) => setTempFriendUsername(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          if (socket) {
                            handleAddFriend(socket, Username, tempFriendUsername);
                          } else {
                            console.error("Socket not initialized yet.");
                          }
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div className="Requests-Container">
                      <div className="Heading">
                        <h2>Requests</h2>
                        <h3>Clear All</h3>
                      </div>

                      <div className="Requests">
                        {requestsSampleData.map((friend) => {
                          return (
                            <div className="Request" key={friend}>
                              <div className="Request-Info">
                                <h2>{friend}</h2>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
