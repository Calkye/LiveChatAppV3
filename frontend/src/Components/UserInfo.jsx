import "./Css/UserInfo.css";

const UserInfo = ({ Username, Message, ImageUrl, Error }) => {
  if (Message) {
    return (
      <div className="UserInfo-Container Message">
        <div className="UserInfo">
          <div className="pfp">
            <img src={ImageUrl || "/default-avatar.png"} alt="User Avatar" />
          </div>
          <div className="User-Details">
            <h2>{Username}</h2>
            <h4 className="Messageh4">{Message}</h4>
          </div>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="UserInfo-Container">
        <div className="UserInfo">
          <div className="pfp">
            <img src={ImageUrl || "/default-avatar.png"} alt="User Avatar" />
          </div>
          <div className="User-Details">
            <h2>{Username}</h2>
          </div>
        </div>
      </div>
    );
  }
};

export default UserInfo;
