import {Link, useHistory, useLocation} from "react-router-dom"
import {useState,useRef} from "react"
import validator from "validator"
import axios from "axios"


function Regform({parentHistory}) {
    const location = useLocation()
    
    const history = useHistory()

    const {inputEmail} = location.state || ""
    const [emailInput,setEmailInput] = useState(inputEmail)

    const [isChecked,setChecked] = useState(false)
    const [emailError,setEmailError] = useState("")
    const [emailStyle,setEmailStyle] = useState({})
    const [Email,setEmail] = useState(inputEmail)
    const [emailFocused,setEmailFocus] = useState(Boolean(emailInput))
    const [Password,setPassword] = useState("")
    const [passwordStyle,setPasswordStyle] = useState({})
    const [passwordError,setPasswordError] = useState("")
    const [passwordFocused,setPasswordFocus] = useState(false)

    const [isLoading,setIsLoading] = useState(false)
    const Check = ()=>{
    setChecked(p=>!p)
    }
    const emailFocusIn=()=>{
        setEmailFocus(true)
    }
    const emailFocusOut=(e)=>{
      setEmailFocus(false)
      var el = e.target
      if(el.value=="")
      {
        setEmailFocus(false)

      }
      else{
        setEmailFocus(true)
      }
  }
    const passwordFocusIn = ()=>{
      setPasswordFocus(true)
    }
    const passwordFocusOut= (e)=>{
      var el = e.target
      if(el.value=="")
      {
        setPasswordFocus(false)

      }
      else{
        setPasswordFocus(true)
      }
    }
    const validateEmail= e=>{
      let email  = e.target.value
      setEmailInput(email)
      setEmail(email)
      if(email.length>=5&&email.length<=50)
      {
        if(!validator.isEmail(email))
        {
          setEmailError("Please enter a valid emmail address!")
          setEmailStyle({
            border:"1px solid #b92d2b"
          })
        }
        else{
          setEmailStyle({
            border:"1px solid green"
          })
          console.log(emailError.length)
          if(emailError.length==0)
          return
          else
          setEmailError("")
        }
      }
      else
      {
        setEmailError("Email should be between 5 and 50 characters!")
        setEmailStyle({
          border:"1px solid #b92d2b"
        })
      }
      if(email==0)
      {
        setEmailStyle({})
        setEmailError("")
      }
    }
    const validatePassword = e =>{
      let password = e.target.value
      setPassword(password)
      if(password.length<6||password.length>60)
      {
      setPasswordStyle(
        {
          border:"1px solid #b92d2b"
        }
      )
      setPasswordError('Password should be between 6 and 60 characters!')
      }
      else
      {
        setPasswordStyle(
          {
            border:"1px solid green"
          }
        )
        if(passwordError.length==0)
        return
        else
        setPasswordError('')
      }
      if(password.length==0)
      {
        setPasswordError('')
        setPasswordStyle({})
      }
    }
    const Register = async (e)=>{
      if(passwordError.length==0&&emailError.length==0&&validator.isEmail(Email))
      {
        try {
          e.preventDefault()
          const data = {
            email:Email,
            password:Password
          }
          console.log("Logged Output:: login -> data", data)
          const url = "https://netlixclone-backend.herokuapp.com/register"
          setIsLoading(p=>true)
          const res = await axios.post(url,data)
          setIsLoading(p=>false)
          console.log(res);
          if(res.status==200)
          parentHistory.push('/login')
        }

         catch (error) {
            setIsLoading(p=>false)
            if(error.response.status==406) setEmailError("Email already registered")
            else setEmailError("Server Error")
            setEmailStyle(
              {
                border:"1px solid #b92d2b"
              }
            )
        }
      }
      else{
        return
      }
    }
    return (
      <div className="signupBody sb2">
        <span className="bodyImage"></span>
        <h3>STEP <span className="bold">2</span> OF <span className="bold">2</span></h3>
        <div>
          <h2>Create a password to start your membership</h2>
        </div>
        <div>
          <p>Just a few more steps and you're done!</p>
        </div>
        <div>
          <p>We hate paperwork, too.</p>
        </div>
        <form>
          <div className="registerForm-container">
            <input  value={emailInput} className="formInput" id="emailInput" onChange={e=>validateEmail(e)} onFocus={emailFocusIn} onBlur={e=>emailFocusOut(e)} style={emailStyle}></input>
            <label htmlFor="emailInput" className={emailFocused?"focusedLabel":""}>Email</label>
          </div>
          <div className="emailError formError">
            {emailError}
          </div>
          <div className="registerForm-container">
            <input className="formInput" id="passwordInput" onChange={e=>validatePassword(e)} onFocus={e=>passwordFocusIn(e)} onBlur={passwordFocusOut} style={passwordStyle} type="password"></input>
            <label htmlFor="passwordInput" className={passwordFocused?"focusedLabel":""}>Add a password</label>

          </div>
          <div className="PasswordError formError">
            {passwordError}
          </div>

        </form>
        <div className={isChecked?"check-container checked":"check-container"} onClick={Check}>
          <input className="formCheck" type="checkbox"></input><label>Please do not email me Netflix special offers.</label>
        </div>
        <Link><button className={isLoading?"awaitLoad":""} onClick={Register}>Register</button></Link>
      </div>
    );
  }

export default Regform;