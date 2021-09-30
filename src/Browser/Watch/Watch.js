import ReactPlayer from 'react-player/lazy'
import screenfull from "screenfull"
import {useEffect, useRef, useState} from "react"
import {useLocation} from "react-router-dom"
import { BrowserRouter as  useHistory } from "react-router-dom";
import {ReactComponent as Play} from "assets/play.svg"
import {ReactComponent as Pause} from "assets/pause.svg"
import {ReactComponent as Back10} from "assets/back10.svg"
import {ReactComponent as Forward10} from "assets/forward10.svg"
import {ReactComponent as Fullscreen} from "assets/fullscreen.svg"
import VolumeControl from "./VolumeControl"
import Velocimeter from "./Velocimeter"

const secondsToMinutes = (s)=>{
    if(!seconds>=60) return `${s}`
    var minutes = Math.floor(s / 60);
    var seconds = s - minutes * 60;
    return `${minutes}:${seconds}`
}
export default function Watch({history}) {
    const location = useLocation()
    if(!location.state) history.goBack()
    const {movieVideoUrl} = location.state
    const sliderRef = useRef()
    const playerRef = useRef()
    const volumeRef = useRef()

    const[isPlaying,setPlaying] = useState(true)
    const[isMuted,setMuted] = useState(false)
    const[isFullscreen,setIsFullscreen] = useState(false)
    const[playbackRate,setPlaybackRate]= useState(1)
    const[loaded,setLoaded] = useState(0)
    const[progress,setProgress] = useState({
        fraction:0,
        seconds:0
    })
    const[hideProgress,setHideProgress] = useState(false)
    const [volume,setVolume] = useState(1)
    const [mousedown,setMousedown] = useState(false)
    const [mousedownVolume,setMousedownVolume] = useState(false)


    const requestFullScreen= ()=>{
        if(!isFullscreen) screenfull.request()
        else screenfull.exit()
        setIsFullscreen(p=>!p) 
    }
    //Refactor
    //Well start by using prettier, 
    //ditch the ternaries, use variables for things like +10 and -10, 
    //don't mutate argProgress, create small functions and compose them into 
    //the jumpTo function
    const jumpTo = (e,args)=>{
        if(!mousedown && e._reactName == "onMouseMove") return
        e.nativeEvent.stopImmediatePropagation()
        const duration = playerRef.current.getDuration()
        if(args)
        {

        const seconds = duration*(progress.fraction/100)
        let argProgress ={}
        if(args==="-10")
        {
        const newFrac = seconds<=0 ? 0 : (progress.fraction-((seconds-10)/duration))
        argProgress = {
            fraction:newFrac,
            seconds:Math.max((seconds-10),0)
        }
        }
        if(args==="+10")
        argProgress = {
            fraction:Math.min((progress.fraction+((seconds+10)/duration)),100),
            seconds:Math.min((seconds+10),duration)
        }
        setProgress(p=>argProgress);
        playerRef.current.seekTo(argProgress.seconds);
        return}


        
        const refBound = sliderRef.current.getBoundingClientRect()
        const pos = ((e.clientX-refBound.x)-12.5)/refBound.width*100;
        const newProgess = {
                fraction:pos,
                seconds:duration*(pos/100)
        }
        setProgress(p=>newProgess)
        playerRef.current.seekTo(duration*(pos/100))
        setPlaying(p=>true)
    }
    const assignProgres = ({played,loaded})=>{
        const duration = playerRef.current.getDuration()
        const newProgess = {
            fraction:played*100,
            seconds:duration*played
    }
        setProgress(p=>newProgess)
        setLoaded(p=>loaded*100)
    }
    
    const changeVolume = (e,mousedown)=>{
        if(!mousedownVolume && e._reactName == "onMouseMove") return
        const refBound = volumeRef.current.getBoundingClientRect()
        const pos = ((e.clientY-refBound.y))/refBound.height;
        const percentage = 1 - (pos<0? 0 : pos);
        setVolume(p=>percentage > 0? percentage : 0)
        
    }
    
    return (
        <div className="browse-WatchContainer" onMouseMove={(e)=>{jumpTo(e);changeVolume(e)}} onMouseUp={()=>{setMousedown(p=>false)}}>
          <ReactPlayer
            ref={playerRef}
            className="player"
            wrapper="div"
            onProgress={assignProgres}
            url={`https://www.youtube.com/watch?v=${movieVideoUrl}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0" frameborder="0"`}
            playbackRate={playbackRate}
            playing={isPlaying}
            muted={isMuted}
            volume={volume}
            controls={false}
            height="100%"
            width="100%"
            />
            <div className="WatchContainer-ControlsContainer">
                <div className="ControlsContainer-TimeControl" style={{opacity:hideProgress?"0":"1"}}>
                    <div ref={sliderRef} onClick={(e)=>jumpTo(e)} className="TimeControl-BarContainer" onMouseDown={()=>{setMousedown(p=>true);setPlaying(p=>false)}}>
                        <div className="BarContainer-BufferedTime" style={{width:`${loaded}%`}}></div>
                        <div className="BarContainer-PlayedTime" style={{width:`${progress.fraction}%`}}></div>
                        <div className="BarContainer-Thumb" style={{left:`${progress.fraction}%`}}></div>
                    </div>
                    <label className="currentTime">{secondsToMinutes(Math.round(progress.seconds))}</label>
                </div>
                <div className="ControlsContainer-Actions">
                    <div className="ControlsContainer-Left">
                        {isPlaying?<Pause onClick={()=>{setPlaying(p=>false)}}/>:<Play onClick={()=>{setPlaying(p=>true)}}/>}
                        <Back10 onClick={(e)=>jumpTo(e,'-10')} onMouseDown={requestFullScreen}/>
                        <Forward10 onClick={(e)=>jumpTo(e,'+10')}/>
                        <VolumeControl setMousedownVolume={setMousedownVolume} changeVolume={changeVolume} volumeRef={volumeRef} setHideProgress={setHideProgress} volume={volume} setVolume={setVolume}/>
                        
                    </div>
                    <div className="ControlsContainer-Right">
                    <Velocimeter setHideProgress={setHideProgress} setPlaybackRate={setPlaybackRate}/>
                    <Fullscreen onClick={requestFullScreen}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
