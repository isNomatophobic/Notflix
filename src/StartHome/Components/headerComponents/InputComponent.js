import {useState} from "react"
import validator from "validator"
import {ReactComponent as Arrow} from "assets/arrow.svg"
import {Link} from "react-router-dom"
function InputComponent()
{
    const [isFoucsed,setFocus]=useState(false)
    const [isValidEmail,setValid]=useState(true)
    const [currEmail,setEmail]=useState('')
    function focusIn(){
        setFocus(pFoucsed=>true)
    }
    
    function focusOut(e){
        var el = e.target
        if(el.value=="")
        {
            setFocus(pFoucsed=>false)

        }
        else{
            setFocus(pFoucsed=>true)

        }
    }
    function validateEmail(e)
    {
        var email = e.target.value
        setEmail(prev=>email)
        if(validator.isEmail(email))
        {
            setValid(prev=>true)
        }
        else{
            setValid(prev=>false)
        }
        if(email=="")
        setValid(prev=>true)

        focusOut(e)

    }
    return(
        <div className="inputComponent-container">
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <div className="input-container">
                <label htmlFor="submitEmail" className={isFoucsed?"inputFocused":"inputUnfocused"}>Email Adress</label>
                <input id="submitEmail"  onFocus={focusIn} onBlur={(e)=>focusOut(e)} onChange={(e)=>validateEmail(e)}></input>
                <Link to={isValidEmail&&currEmail!=""?{
                    pathname:"signup/registration",
                    state:{
                        inputEmail:currEmail
                    }
                }:"/"}><button className="redButton" onClick={()=>{focusIn();setValid(false)}}>Get Started <span><Arrow/></span></button></Link>
                <h4 style={{display:isValidEmail?"none":"block"}}>Please enter a valid email address</h4>
            </div>
        </div>
    );
}
export default InputComponent