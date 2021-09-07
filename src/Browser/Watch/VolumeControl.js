import React,{useRef, useState} from 'react'
import {ReactComponent as VolumeMax} from "assets/volumeMax.svg"



export default function VolumeControl({setMousedownVolume,setHideProgress,volume,setVolume,changeVolume,volumeRef}) {
    const [isHovered,setHovered] = useState(false)
    return (
        <div className="ControlsContainer-VolumeControl" onMouseEnter={()=>setHideProgress(p=>true)} onMouseLeave={()=>{setHideProgress(p=>false);setHovered(p=>false)}}>
            <div className="VolumeControl-VolumeBar" style={{display:isHovered?"flex":"none"}} >
                <div className="VolumeBar-Inside" ref={volumeRef} onClick={changeVolume} onMouseDown={()=>setMousedownVolume(p=>true)}>
                    <div className="VolumeBar-Thumb" style={{bottom:`${volume*100}%`}}></div>
                    <div className="VolumeBar-Progress" style={{height:`${volume*100}%`}}></div>
                </div>
            </div>
            <VolumeMax onMouseEnter={()=>setHovered(p=>true)}/>
        </div>
    )
}
