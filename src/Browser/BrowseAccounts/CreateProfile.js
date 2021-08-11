import { Link, useHistory,Redirect } from "react-router-dom"
import "./BrowseAccounts-Styles.css"
import {ReactComponent as Logo} from "../../assets/logo.svg"
import { useRef, useState } from "react";
import axios from "axios"

function CreateProfile({setAccounts,accounts}) {

    const history = useHistory()

    const [isCheckedKids,setCheckedKids] = useState(false)
    const nameInput = useRef()
    const check = ()=>{
        setCheckedKids(p=>!p)
    }
    const addProfile = async ()=>{
        const email =sessionStorage.getItem('userEmail') ;
        const jwt = sessionStorage.getItem('jwt');
        const name = nameInput.current.value
        if(name.length>0)
        {
            try{
            const data = {
                email:email,
                accountName:name,
                accountImage:'107 - LJ9dB0T',
                jwt:jwt
            }
            const url = "https://netlixclone-backend.herokuapp.com/login/accounts"
            const res = await axios.post(url,data)

            const newAcc = accounts
            newAcc.splice(newAcc.length-2, 0, data);
            setAccounts(newAcc)
            history.goBack()
            }
            catch(e)
            {
                console.log(e);
            }
        }
        
    }
    const cancel = ()=>{
        history.goBack()
    }
    return (
        
        <div className="browseAccounts-container">
            <div className="browseAccounts-NavbarContainer"> <Link to="/"> <Logo/> </Link></div>
            <div className="createProfile-BodyContainer ">
                <div className="createProfile-body">
                    <h2>Add Profile</h2>
                    <h4>Add a profile for another person watching Netflix.</h4>
                    <div className="createProfile-formContainer">
                        <div className="imgContainer"><img src="/Images/profileImages/107 - LJ9dB0T.png"></img></div>
                        <input ref={nameInput} placeholder="Name" className="inputText"></input>
                        <div className={isCheckedKids?"kidsOption checked":"kidsOption"} onClick={check}>
                            <input type="radio" className="radioInput"></input>
                            <p>Kid?</p>
                        </div>
                    </div>
                    <button className="continue" onClick={addProfile}>Continue</button>
                    <button className="cancel" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
    }

export default CreateProfile;
