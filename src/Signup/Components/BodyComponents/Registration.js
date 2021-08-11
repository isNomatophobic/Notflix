import {Link, useLocation} from "react-router-dom"
import {useRef} from "react"
function Registration() {
  const location = useLocation()
  const {inputEmail} = location.state
  console.log(inputEmail)
    return (
            <div className="signupBody sb1">
                <span className="bodyImage"></span>
                <h3>STEP <span className="bold">1</span> OF <span className="bold">2</span></h3>
                <div>
                 <h2>Finish setting up your account</h2>
                </div>
                <div>
                   <p>Netflix is personalized for you.
                   Create a password to watch on any device at any time.</p>
                 </div>
                 <Link to={{
                    pathname:"regform",
                    state:{
                        inputEmail:inputEmail
                    }
                }}><button>Next</button></Link>
            </div>
    );
  }
  
  export default Registration;
  