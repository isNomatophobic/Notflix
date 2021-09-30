import React,{useState,useRef,useEffect} from 'react'
import {useOutsideAlerter} from "Hooks/useOutsideAlerter"

import optionsData from "data/optionsData.json"
import VelocimeterOption from "./VelocimeterOption"
import {ReactComponent as VelocimeterSVG} from "assets/velocimeter.svg"

export default function Velocimeter({setHideProgress ,setPlaybackRate}) {
    const [isHovered,setHovered] = useState(false)
    const [currentClicked,setCurrentClicked] = useState(null)
    const arrayOfOptions = optionsData.map((option)=>{
        return <VelocimeterOption optionId={option.id} optionSpeed={option.speed} currentClicked={currentClicked} setCurrentClicked={setCurrentClicked} setPlaybackRate={setPlaybackRate}/>
    })
    //Task mathis this into another custom hook.
    const velocimeterContainer = useRef(null)
    const outside = useOutsideAlerter(velocimeterContainer)
    useEffect(()=>{
        if(outside && isHovered) setHovered(p=>false)
    },[outside])    
    
    const handleEnter = ()=>{
        setHovered(p=>true)
        setHideProgress(p=>true)
    }
    return (
        <div ref={velocimeterContainer} className="VelocimeterContainer" onClick={handleEnter} onMouseEnter={handleEnter} onMouseLeave={()=>{setHovered(p=>false);setHideProgress(p=>false)}}>
            <div className="Velocimeter" style={{visibility:isHovered?"visible":"hidden"}}>
                <h3>Playback Speed</h3>
                <div className="VelocimeterOptions">
                    {arrayOfOptions}
                </div>
            </div>
            <VelocimeterSVG />  

        </div>
    )
}
