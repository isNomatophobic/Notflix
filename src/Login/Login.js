import {useEffect} from "react"
import "./Login-Styles.css"
import Background from "../StartHome/Components/headerComponents/Background"
import Navbar from "../StartHome/Components/headerComponents/Navbar"
import LoginBody from "./Components/LoginBody"
import LoginFooter from "./Components/LoginFooter"
function Login() {  
  const bgStyle='rgba(0,0,0,0.5)'

  return (
      <div className="login-container" style={{color:"white"}}>
        <div className="login-wrapper">
            <Navbar displayLink={false}/>
            <LoginBody/>
          </div>
          <LoginFooter/>
          <Background bgStyle={bgStyle} height={`106vh`} bgAuto={true}/>
      </div>
  );
}

export default Login;
