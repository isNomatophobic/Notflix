import {ReactComponent as Logo} from "../../assets/logo.svg"
import Account from "./Account"
import "./BrowseAccounts-Styles.css"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"


function BrowseAccounts({accounts}) {
    const arrayAccounts = accounts.map((account)=>{
        return <Account key={Math.random()} name={account.accountName} image={account.accountImage}/>
    })
    const [entrance,setEntrance] = useState(true)

    useEffect(async ()=>{
        setTimeout(()=>{
            setEntrance(false)
        },1000)
    },[])
    return (
        <div className="browseAccounts-container" key={Math.random()}>
            <div className="browseAccounts-NavbarContainer"> <Link to="/"> <Logo/> </Link></div>
            <div className="browseAccounts-BodyContainer">
                	<div key ={Math.random()} className={entrance?"browseAccounts-Body entrance":"browseAccounts-Body"}>
                        <h2>Who's watching</h2>
                        <div className="browseAccounts-ProfilesContainer">
                            {arrayAccounts}
                            {arrayAccounts.length<4?<Account add={true} name="Add Profile" image={"plus3"}/>:undefined}
                        </div>
                        <Link style={{textDecoration:"none"}} to="/browse/manage">MANAGE PROFILES</Link>
                    </div>
            </div>
        </div>
    );
    }

export default BrowseAccounts;
