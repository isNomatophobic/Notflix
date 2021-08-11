function Image ({imageName,setImageClicked,setSelectedImage})
{
    const click = ()=>{
        setImageClicked(true)
        setSelectedImage(imageName)
    }

    return(
        <div className="chooseImage-profileImage" onClick={click}>
            <img src={`/Images/profileImages/${imageName}.png`}></img>
        </div>
    );
}

export default Image