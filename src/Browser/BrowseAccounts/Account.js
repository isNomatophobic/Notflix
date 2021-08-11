import { useHistory } from "react-router-dom";
import {ReactComponent as Pencil} from "../../assets/pencil.svg"

function Account({image,name,mode,add,setCreator:setCreator}) {

  const history = useHistory()

  const createProfile = ()=>{
    history.push('/browse/createProfile')
  }

  const manageProfile = ()=>{
    if(add) return
    if(mode)
    history.push({
      pathname:"/browse/manageProfile",
      state:{
        currentName:name,
        currentImage:image
      }
    })
    else{
      history.push({
        pathname:"/browse",
        state:{
          currentName:name,
          currentImage:image
        }
    })
  }
}
  const profilePic=image || "341 - kDoJa0M";
  return (
      <div className={mode?"account-container account-imgManage":"account-container"} onClick={manageProfile}>
        {add?
          <div className="account-img addAccount" onClick={createProfile} >
          <img src={`/Images/profileImages/${profilePic}.png`}></img>
          {mode?
          <div className="account-manage">
            <Pencil/>
          </div>
          :null}
      </div>:
          <div>
          <img src={`/Images/profileImages/${profilePic}.png`}></img>
          {mode?
          <div className="account-manage">
            <Pencil/>
          </div>
          :null}
      </div>}

          <p className>{name}</p>
      </div>
  );
}

export default Account;
