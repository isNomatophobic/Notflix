import React, { useState,useEffect } from 'react'
import {ReactComponent as Logo} from "assets/logo.svg"
import {ReactComponent as Search} from "assets/search2.svg"
import {ReactComponent as Bell} from "assets/bell.svg"
import {useHistory} from "react-router-dom"

export default function BrowseMainNavbar({currentUser,accounts,setLoading,setCurrentUser}) {
    const history = useHistory()
    const [offSetHeight,setOffSetHeight] = useState(0)
    const getOffSet = ()=>{
        setOffSetHeight(p=>window.pageYOffset)
    }
    useEffect(() => {
        window.addEventListener("scroll",getOffSet)
        return ()=>window.removeEventListener("scroll",getOffSet)
    }, [])
    const changeUser = async (accountName,accountImage)=>{
        setLoading(true)
        setCurrentUser({
            userName:accountName,
            userImage:accountImage
        })                                                                                                                         

    }
    const logout = ()=>{
        sessionStorage.clear();
        history.push({
            pathname:'/login'});
    }
    const arrayAccounts = accounts.map((account)=>{
        if(account.accountImage!==currentUser.userImage)
        return <li onClick={()=>changeUser(account.accountName,account.accountImage)}><img src={`/Images/profileImages/${account.accountImage}.png`}></img><p>{account.accountName}</p></li>
    })
    return (
        <div className={offSetHeight>0?`browseMain-navbarContainer offSet`: "browseMain-navbarContainer"} >
        <Logo onClick={()=>history.push({pathname:"/browse",state:{currentImage:currentUser.userImage}})}/>
        <div className="browseMain-navbarUtilities">
            <div className="searchContainer iconContainer"><Search/></div>
            <div className="bellContainer iconContainer">
                <Bell className="bell"/>
                <span className="triangle"></span>
                <div className="recentNotifications">
                    <p>No recent notifications</p>
                </div>
            </div>
            <div className="accountMenu" >
                <div className="imgContainer">
                    <img src={`/Images/profileImages/${currentUser.userImage}.png`}></img>
                </div>
                <span className="triangleMenu"></span>
                <span className="triangleMenu triangleDropDown"></span>
                <div className="accountMenu-dropDown">
                    <ul style={{listStyle:'none'}}>
                        {arrayAccounts}
                        <li><p onClick={()=>history.push({pathname:"/browse/manage",state:{currentImage:currentUser.userImage}})}>Manage profiles</p></li>
                    </ul>
                    <ul style={{listStyle:'none'}}>
                        <li><p onClick={logout}>Sign out of Netflix</p></li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
}
