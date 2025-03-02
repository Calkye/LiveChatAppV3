import "./Css/Settings.css"; //Always import css files first

// React imports 
import { useState, useContext, useEffect } from "react";

// Socket imports
import { io } from "socket.io-client";

// Context Api's 
import { FriendContext } from "../../ContextApi/FriendContextApi.jsx";
import { UserContext } from "../../ContextApi/UserContextApi.jsx";

// Custom functions 
import handleAddFriend from "./handleAddFriend.js";
import GetFriendRequests from "./GetFriendRequests.js";
import handleAcceptRequest from "./HandleAcceptRequest.js";

// Svgs / Images 
import settings from "../../../public/Settings.svg";
import Connection from "../../ContextApi/ConnectionContextApi.jsx";

const Settings = () => {
  const [modal, setModal] = useState(false);
  const [friendsModal, setFriendsModal] = useState(false);

  const { addedUsernames, setAddedUsernames, friendUsernames, setFriendUsernames, selectedFriend, setSelectedFriend } = useContext(FriendContext);
  const { Username, password } = useContext(UserContext);

  const [tempFriendUsername, setTempFriendUsername] = useState("");
  const [requestsSampleData, setRequestsSampleData] = useState([]);

  const [socket, setSocket] = useState(null);

  
  useEffect(() => {
    // Establish a connection when the component mounts
    Connection('friends')
      .then((socket) => {
        setSocket(socket);
        // Now you can use the socket here
      })
      .catch((error) => {
        console.error('Error connecting to socket:', error);
      });

    return () => {
      if (socket) {
        socket.disconnect();
        console.log(`Disconnected from socket with ID: ${socket.id}`);
      }
    };
  }, []); // Empty array ensures this only runs on mount

  
  //Get friends every 500 milliseconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!socket) {
        console.log("No socket");
        return; // Don't continue if the socket is not ready
      }
      console.log("Getting friend requests");
      GetFriendRequests(socket, Username, setRequestsSampleData);
    }, 500);
  
    return () => {
      clearInterval(interval); // Cleanup the interval
    };
  }, [socket, Username]); // Add socket and Username to dependencies
  


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
                      className="AddFriendBtn"
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
                              <div className="Request-Info" onClick={() => {
                                handleAcceptRequest(socket, Username, friend, setFriendUsernames, setSelectedFriend);
                                setModal((prevModal) => !prevModal);
                              }}>
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
