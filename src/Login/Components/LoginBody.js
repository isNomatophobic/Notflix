import {useState,useRef} from "react"
import axios from "axios"
import validator from "validator"
import {Link,useHistory} from "react-router-dom"

function LoginBody() { 

    const history = useHistory()


    const [isFoucsedUsername,setFocusUsername]=useState(false)
    const [isFoucsedPassword,setFocusPassword]=useState(false)
    const [Email,setEmail]=useState('')
    const [userPassword,setPassword]=useState('')
    const [isValidEmail,setValidEmail]=useState(true)
    const [isValidPassword,setValidPassword]=useState(true)
    const [isChecked,setChecked] = useState(false)
    const [isHiddenPassword,setHidden]=useState(true)
    const [errorLogE,setErrorE]=useState(false)
    const [errorLogP,setErrorP]=useState(false)
    const inputEl= useRef(null)

    const [isLoading,setIsLoading] = useState(false)

    function focusInU(){
        setFocusUsername(pFoucsed=>true)
    }
    
    function focusOutU(e){
        var el = e.target
        if(el.value=="")
        {
            setFocusUsername(pFoucsed=>false)

        }
        else{
            setFocusUsername(pFoucsed=>true)

        }
    }
    function focusInP(){
        setFocusPassword(pFoucsed=>true)
    }
    
    function focusOutP(e){
        var el = e.target
        if(el.value=="")
        {
            setFocusPassword(pFoucsed=>false)

        }
        else{
            setFocusPassword(pFoucsed=>true)

        }
    }
    function validateEmail(e)
    {
        var email = e.target.value
        setEmail(email)
        // setEmail(prev=>email)
        if(validator.isEmail(email))
        {
            setValidEmail(prev=>true)
        }
        else{
            setValidEmail(prev=>false)
        }
        if(email=="")
        setValidEmail(prev=>true)

        focusOutU(e)

    }
    function validatePassword(e)
    {
        var password = e.target.value
        // setEmail(prev=>email)
        setPassword(password)
        if(password.length>=4&&password.length<=60)
        {
            setValidPassword(prev=>true)
        }
        else{
            setValidPassword(prev=>false)
        }
        if(password=="")
        setValidPassword(prev=>true)
    }
    function rememberCheck()
    {
        setChecked(p=>!p)
    }
    const hidePassword=()=>{
        console.log(inputEl.current)
        inputEl.current.focus()
        setHidden(p=>!p)
    }
    const login = async (e)=>{
        e.preventDefault();
        if(isValidEmail&&isValidPassword&&Email.length!=0&&userPassword.length!=0)
        {
        console.log(`valid`);
        try {
            e.preventDefault()
            const data = {
                email:Email,
                password:userPassword
            }
            console.log("Logged Output:: login -> data", data)
            const url = "https://netlixclone-backend.herokuapp.com/login"
            setIsLoading(p=>true)
            const res = await axios.post(url,data)
            setIsLoading(p=>false)
            console.log(res.data.jwt);
            if(res.status==200)
            sessionStorage.setItem('jwt',res.data.jwt)
            sessionStorage.setItem('userEmail',Email)
            history.push({
                pathname:'browse/accounts'});
        }
         catch (error) {
            setIsLoading(p=>false)

            if(error.response.data.data=='Email not found') {setErrorP(false); setErrorE(true)}
            if(error.response.data.data=='Invalid Password') {setErrorP(true); setErrorE(false)}

            console.log(error.response.data.data);
            
        }
        }
        else{
            return
        }
    }
  return (
      <div className="loginBody-container">
          <div className="loginBody">
            <div className="loginForm">
                <h2>Sign In</h2>
                <div className="send-inputError" style={{display:errorLogE?"block":"none"}}>
                    <p>Sorry, we can't find an account with this email address. 
                    Please try again or <a>create a new account.</a>
                    </p>
                </div>
                <div className="send-inputError" style={{display:errorLogP?"block":"none"}}>
                    <p>Incorrect password. Please try again or you can <a>reset your password.</a>
                    </p>
                </div>
                <form>
                    <div className={isValidEmail?"login-inputContainer":"login-inputContainer login-inputError"}>
                        <input id="idInput" name="username" onChange={(e)=>validateEmail(e)} onFocus={focusInU} onBlur={(e)=>focusOutU(e)}></input>
                        <label htmlFor="idInput" className={isFoucsedUsername?"login-inputFocused noselect":"login-inputUnfocused noselect"}>Email or phone number</label>
                    </div>
                    <div class="login-emailError formError" style={{display:isValidEmail?"none":"block"}}>
                        Please enter a valid email or phone number.
                    </div>
                    <div className={isValidPassword?"login-inputContainer":"login-inputContainer login-inputError"}>
                        <div className="login-Input passwordInput-container">
                            <input ref={inputEl} id="passwordInput" type={isHiddenPassword?"password":"text"} onChange={(e)=>validatePassword(e)} onFocus={focusInP} onBlur={(e)=>focusOutP(e)}></input>
                            <label htmlFor="passwordInput" className={isFoucsedPassword?"login-inputFocused noselect":"login-inputUnfocused noselect"}>Password</label>
                        </div>
                        <p onClick={hidePassword} style={{opacity:isFoucsedPassword?"1":"0"}} className="noselect">{isHiddenPassword?"SHOW":"HIDE"}</p>
                    </div>
                    <div className="login-passwordError formError" style={{display:isValidPassword?"none":"block"}}>
                        Your password must contain between 4 and 60 characters.
                    </div>

                    <button className={isLoading?"awaitLoad-login":""} onClick={(e)=>login(e)}>Sign In</button>
                </form>
            </div>
            <div className="login-formAddons">
                <div className="loginCheck" onClick={rememberCheck}>
                    {/* changeChecked status by giving state and applying class that has ::before and ::after */}
                    <input type="checkbox"/>
                    <p className={isChecked?"rememberChecked":""}>Remember me</p>
                </div>
                <a>Need help?</a>
            </div>
            <div className="login-extraAddons">
                <div className="addons-1">
                    <a href="https://www.facebook.com" target="_blank">
                        <img src="./Images/fbLogo.png"></img>
                        <p>Login with Facebook</p>
                    </a>
                </div>
                <div className="addons-2">
                    <h4>New to Netflix? </h4>
                    <Link className="loginAddon-clickable" to="/">Sign up now.</Link>
                </div>
                <div className="addons-3">
                    <p>This page is protected by Google reCAPTCHA 
                    to ensure you're not a bot. </p><label className="loginAddon-clickable"> Learn more.</label>
                </div>
            </div>
          </div>
      </div>
  );
}

export default LoginBody;
