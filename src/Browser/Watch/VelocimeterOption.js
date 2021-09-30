import {useState} from 'react'

export default function VelocimeterOption({optionId,optionSpeed,setCurrentClicked,currentClicked,setPlaybackRate}) {
    const handleClick = ()=>{
        setCurrentClicked(p=>optionId)
        setPlaybackRate(p=>optionSpeed)
    }
    return (
        <div className={`Option${optionId} ${currentClicked==optionId?`clickedOption`:''}`} onClick={handleClick}>
            <div className="OptionLine"></div>
            <p>{`${optionSpeed}x ${optionSpeed==1?'(Normal)':''}`}</p>
        </div>
    )
}
