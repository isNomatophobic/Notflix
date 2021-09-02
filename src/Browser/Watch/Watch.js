import ReactPlayer from 'react-player/lazy'
import {useEffect, useRef, useState} from "react"
import {useLocation} from "react-router-dom"
import { BrowserRouter as  useHistory } from "react-router-dom";

const secondsToMinutes = (s)=>{
    console.log(s);
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

    const[isMuted,setMuted] = useState(true)
    const[playbackRate,setPlaybackRate]= useState(1)
    const[thumbPosition,setThumbPostion] = useState(0)
    const[progress,setProgress] = useState({
        fraction:0,
        seconds:0
    })
    const[loaded,setLoaded] = useState(0)
    const jumpTo = (e)=>{
        const refBound = sliderRef.current.getBoundingClientRect()
        const pos = ((e.clientX-refBound.x)-12.5)/refBound.width*100;
        setThumbPostion(p=>pos)
        const duration = playerRef.current.getDuration()
        const newProgess = {
                franction:pos*100,
                seconds:secondsToMinutes(Math.round(duration*(pos/100)))
        }
        setProgress(p=>newProgess)
        playerRef.current.seekTo(duration*(pos/100))
    }
    const assignProgres = ({played,loaded})=>{
        const duration = playerRef.current.getDuration()
        console.log("Logged Output:: assignProgres -> duration", duration)
        const newProgess = {
            franction:played*100,
            seconds:secondsToMinutes(Math.round(duration*played))
    }
        setProgress(p=>newProgess)
        console.log(newProgess);
        setThumbPostion(p=>played*100)
        setLoaded(p=>loaded*100)
    }
    return (
        <div className="browse-WatchContainer">
          <ReactPlayer
            ref={playerRef}
            className="player"
            wrapper="div"
            onProgress={assignProgres}
            url={`https://www.youtube.com/watch?v=${movieVideoUrl}`}
            playbackRate={playbackRate}
            playing={true}
            muted={isMuted}
            volume={0.4}
            controls={false}
            height="100%"
            width="100%"
            />
            <div className="WatchContainer-ControlsContainer">
                <div className="ControlsContainer-TimeControl">
                    <div ref={sliderRef} onClick={jumpTo} className="TimeControl-BarContainer">
                        <div className="BarContainer-BufferedTime" style={{width:`${loaded}%`}}></div>
                        <div className="BarContainer-PlayedTime" style={{width:`${progress.fraction}%`}}></div>
                        <div className="BarContainer-Thumb" style={{left:`${thumbPosition}%`}}></div>
                    </div>
                    <label className="currentTime">{progress.seconds}</label>
                </div>
                <div className="ControlsContainer-Actions"></div>

            </div>
        </div>
    )
}
