import {ReactComponent as Logo} from "../../../assets/logo.svg"
import {Link,Redirect} from "react-router-dom"
function Navbar(p)
{
    return(
        <div className="navbar-container" style={{background:p.bg}}>
            <Logo/>
            <Link to="/login" className="redButton" style={{ textDecoration: 'none' ,display:p.displayLink? "inline":"none"}}> Sign In</Link>
        </div>
    );
}   
export default Navbar