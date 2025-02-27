import './Css/UserInfo.css'

const UserInfo = ({Username, Message, ImageUrl, IsMessage})=>{
  if(IsMessage){
    return(
      <div className="UserInfo-Container Message">
      <div className="UserInfo Message">
          <div className="pfp"><img src={ImageUrl}/></div>

        <div className="Message">
          <h2>{Username}</h2>
          <h4 className='Messageh4'>{Message}</h4>
        </div>
      </div>
    </div>
    )
  }else{
    return (
      <div className="UserInfo-Container">
        <div className="UserInfo">
          <div className="pfp">
            <img src={ImageUrl}  />
  
          </div>
          <div className="Message">
            <h2>{Username}</h2>
            <h4>{Message}</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default UserInfo