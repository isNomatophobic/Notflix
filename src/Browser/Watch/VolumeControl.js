import React,{useEffect, useRef, useState} from 'react'
import {useOutsideAlerter} from "Hooks/useOutsideAlerter"
import {ReactComponent as VolumeMax} from "assets/volumeMax.svg"
import {ReactComponent as VolumeMedium} from "assets/volumeMedium.svg"
import {ReactComponent as VolumeLow} from "assets/volumeLow.svg"
import {ReactComponent as Muted} from "assets/muted.svg"




export default function VolumeControl({setMousedownVolume,setHideProgress,volume,setVolume,changeVolume,volumeRef}) {
    const [isHovered,setHovered] = useState(false)
    const volumeContainer = useRef(null)
    const outside = useOutsideAlerter(volumeContainer)
    useEffect(()=>{
        if(outside && isHovered) setHovered(p=>false)
    },[outside])
    const handleClick = ()=>{
        if(isHovered)setHovered(p=>false)
        else setHovered(p=>true)
    }
    return (
        <div ref={volumeContainer} className="ControlsContainer-VolumeControl" onMouseEnter={()=>setHideProgress(p=>true)} onMouseLeave={()=>{setHideProgress(p=>false);setHovered(p=>false)}}>
            <div className="VolumeControl-VolumeBar" style={{display:isHovered?"flex":"none"}} >
                <div className="VolumeBar-Inside" ref={volumeRef} onClick={changeVolume} onMouseDown={()=>setMousedownVolume(p=>true)} onMouseUp={()=>setMousedownVolume(p=>false)}>
                    <div className="VolumeBar-Thumb" style={{bottom:`${volume*100}%`}}></div>
                    <div className="VolumeBar-Progress" style={{height:`${volume*100}%`}}></div>
                </div>
            </div>
            {volume>=0.66?
            <VolumeMax onClick={handleClick} onMouseEnter={()=>setHovered(p=>true)}/>
            :volume>=0.33 ? 
            <VolumeMedium onClick={handleClick} onMouseEnter={()=>setHovered(p=>true)}/>
            :volume>0?
            <VolumeLow onClick={handleClick} onMouseEnter={()=>setHovered(p=>true)}/>
            :<Muted onClick={handleClick} onMouseEnter={()=>setHovered(p=>true)}/>}
        </div>
    )
}
