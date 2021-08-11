import "./BrowseAccounts-Styles.css"
import Image from "./Image"
import {ReactComponent as Logo} from "assets/logo.svg"
import { Link,useLocation, useHistory,Redirect } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import {ReactComponent as Pencil} from "assets/pencil.svg"
import {ReactComponent as Arrow} from "assets/arrow.svg"

import axios from "axios"


function ManageProfile({accounts,setAccounts}) {

    const history = useHistory()

    const location = useLocation()
    const {currentImage} = location.state || "107 - LJ9dB0T"
    const [currentName,setCurrentName]= useState(location.state?.currentName ?? '')
    const [isSelectingImage,setSelectingImage] = useState(false)
    const [selectedImage,setSelectedImage] = useState(currentImage)
    const [imageClicked,setImageClicked] = useState(false)

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      
    const images = importAll(require.context('../../../public/Images/profileImages', false, /\.(png|jpe?g|svg)$/));
    const arrayImages = Object.keys(images)
    const imageComponents = arrayImages.map((image)=>{
        const formatedImageName = image.split('.')[0]
        if(formatedImageName!=="plus3")
        return <Image imageName={formatedImageName} setImageClicked={setImageClicked} setSelectedImage={setSelectedImage}/>
    })

    const inputRef= useRef()

    const cancel = ()=>{
        history.goBack()
    }
    const pencilStyle={
        position:'absolute',
        left:'2%',
        bottom:'5%',
        width:'20px',
        height:'20px',
        borderRadius:'20px',
        backgroundColor:"black"
    }
    useEffect(()=>{
        try {
            inputRef.current.value=currentName || ""

        } catch (error) {
            
        }
    },[isSelectingImage,imageClicked])



    const startSelection = ()=>{
        setSelectedImage(currentImage)
        setImageClicked(false)
        setSelectingImage(true)
    }
    const stopSelection = ()=>{
        setSelectingImage(false)
    }
    const changeImage= ()=>{
        setImageClicked(false)
        setSelectingImage(false)
    }
    const changeName=()=>{
        setCurrentName(inputRef.current.value)
    }
    const changeAccount = async()=>{
        const email =sessionStorage.getItem('userEmail') ;
        const jwt = sessionStorage.getItem('jwt');
        const name = location.state.currentName
        const newName = currentName
        const newImage = selectedImage
        try{
            const data = {
                email:email,
                accountName:name,
                newAccountName:newName,
                newAccountImage:newImage,
                jwt:jwt
            }
            const url = "https://netlixclone-backend.herokuapp.com/login/accounts"
            const res = await axios.patch(url, data);
            var newAccounts= accounts.map((account)=>{
                
                if(account.accountName==name)
                {
                    account.accountName=newName;
                    account.accountImage= newImage
                }
                return account
            });
            console.log(newAccounts);
            setAccounts(newAccounts)
            history.goBack()
            }
            catch(e)
            {
                console.log(e);
            }
    }
    const deleteAccount = async()=>{
        const email =sessionStorage.getItem('userEmail') ;
        const jwt = sessionStorage.getItem('jwt');
        const name = location.state.currentName
        try{
            const data = {
                email:email,
                accountName:name,
                jwt:jwt
            }
            console.log(data);
            const url = "https://netlixclone-backend.herokuapp.com/login/accounts"
            const res = await axios.delete(url, { data: data});
            var newAccounts= accounts.filter((account)=>{
                return account.accountName!==data.accountName
                
            });
            console.log(newAccounts);
            setAccounts(newAccounts)
            history.goBack()
            }
            catch(e)
            {
                console.log(e);
            }
    }

    return (
        
        <div className="browseAccounts-container">
            <div className="browseAccounts-NavbarContainer"> <Link to="/"> <Logo/> </Link></div>
                {!isSelectingImage?
                            <div className="createProfile-BodyContainer ">
                                <div className="createProfile-body">
                                <h2>Add Profile</h2>
                                <h4>Add a profile for another person watching Netflix.</h4>
                                <div className="createProfile-formContainer">
                                    <div className="imgContainer pointer" style={{position:'relative'}} onClick={startSelection}>
                                        <img src={`/Images/profileImages/${selectedImage}.png`}></img>
                                        <Pencil style={pencilStyle}/>
                                        </div>
                                    <input ref={inputRef} onChange={changeName} placeholder="Name" className="inputText"></input>
                                </div>
                                <button className="continue" onClick={changeAccount}>Save</button>
                                <button className="cancel" onClick={cancel}>Cancel</button>
                                <button className="cancel" onClick={deleteAccount}>DELETE PROFILE</button>
                            </div>
                        </div>
                    : !imageClicked?
                        <div className="chooseImage-BodyContainer">
                            <div className="chooseImage-accountInfo">
                                <div className="titleContainer">
                                    <span onClick={stopSelection}></span>
                                    <h3>Edit Profile</h3>
                                    <h4>Choose a profile icon.</h4>        
                                </div>
                                <div className="profileInfo">
                                    <h5>{currentName}</h5>
                                    <div className="imgContainer">
                                        <img src={`/Images/profileImages/${currentImage}.png`}></img>
                                    </div>
                                </div>   
                             </div>
                             <div className="chooseImage-imagesContainer">
                                {imageComponents}
                             </div>
                            </div>
                    :
                    <div className="createProfile-BodyContainer ">
                        <div className="createProfile-body changeProfile-body">
                            <h2>Change profile icon?</h2>
                            <div className="createProfile-formContainer changeProfile-formContainer">
                                <div className="imgContainer pointer" style={{position:'relative'}} onClick={startSelection}>
                                    <img src={`/Images/profileImages/${currentImage}.png`}></img>
                                    <p>Current</p>
                                    </div>
                                    <Arrow/>
                                <div className="imgContainer pointer" style={{position:'relative'}} onClick={startSelection}>
                                    <img src={`/Images/profileImages/${selectedImage}.png`}></img>
                                    <p>New</p>
                                    </div>    
                            </div>
                            <button className="continue" style={{fontWeight:"600"}} onClick={changeImage}>LET'S DO IT</button>
                            <button className="cancel" onClick={startSelection}>NOT YET</button>
                        </div>
                    </div>
                }
            </div>
    );
    }

export default ManageProfile;
