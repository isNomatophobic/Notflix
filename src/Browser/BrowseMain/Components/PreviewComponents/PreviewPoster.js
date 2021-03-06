import React from 'react'
import ReactPlayer from "react-player/lazy";
import { useState, useEffect, useRef } from "react";
import useRememberVideo from "Hooks/useRememberVideo"

import {ReactComponent as Unmuted} from "assets/unmuted.svg"
import {ReactComponent as Muted} from "assets/muted.svg"

export default function PreviewPoster({isDetailed,movieVideoUrl,isHovered,dimensions,currentHovered,isPlaying,setPlaying}) {
    const [currentPlay,setCurrentPlay] = useState(false)
    const[isReady,setReady] = useState(false)
    const[isMuted,setMuted] = useState(true)
    const checkProgress = ({playedSeconds})=>{
        if(playedSeconds)
            setReady(p=>true)
    }
    const reset = ()=>{
        setCurrentPlay(p=>false);
        setReady(p=>false)
        setMuted(p=>true)
    }
    useEffect(()=>{
        if(!isHovered) reset()
        else {setCurrentPlay(p=>true);}
    },[isHovered])
    return (
            <div className="PreviewContainer-PosterContainer" style={{minHeight:dimensions.height,minWidth:dimensions.width}}>
                <img src={currentHovered.imgUrl}></img>
                {isHovered||isDetailed?
                <ReactPlayer
                    className="player"
                    style={{opacity:(currentPlay&&isReady)?"1":"0"}}
                    wrapper="div"
                    url={`https://www.youtube.com/watch?v=${movieVideoUrl}`}
                    playing={true}
                    muted={isMuted}
                    volume={0.4}
                    controls={false}
                    height="100%"
                    width="100%"
                    onProgress={checkProgress}
                    onPlay={()=>setPlaying(p=>true)}
                    onEnded={()=>setPlaying(p=>false)}
                    />
                :null}
                <div className="ActionButtons-Button soundControl" style={{visibility:isReady?"visible":"hidden"}}>
                    {isMuted?
                    <Muted onClick={()=>setMuted(p=>false)}/>:
                    <Unmuted onClick={()=>setMuted(p=>true)}/>}
                </div>
                {isDetailed? <div className="posterBackground"></div> : null}
            </div>
    )
}
