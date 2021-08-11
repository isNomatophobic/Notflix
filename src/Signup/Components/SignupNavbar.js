import {ReactComponent as Logo} from "../../assets/logo.svg"
import {Link} from "react-router-dom"
function SignupNavbar() {
  return (
      <div className="signupNavbar-container">
        <Link to="/"><Logo/></Link>
        <Link to="/login" className="loginLink"> Sign In</Link>
      </div>
  );
}

export default SignupNavbar;
