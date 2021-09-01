import {useState,useRef,useEffect} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
import {ReactComponent as Play} from "assets/play.svg"
import {ReactComponent as MoreInfo} from "assets/moreInfo.svg"

import {ReactComponent as Unmuted} from "assets/unmuted.svg"
import {ReactComponent as Muted} from "assets/muted.svg"
import {ReactComponent as Reload} from "assets/reload.svg"
import BrowseMainNavbar from "./HeaderComponents/BrowseMainNavbar"
import { findAllByTestId } from "@testing-library/react"
import ReactPlayer from 'react-player/lazy'
import getRandomInt from "Helpers/getRandomInt"
import sleep from "Helpers/sleep"
const YouTubeToHtml5 = require('@thelevicole/youtube-to-html5-loader');

    export default function BrowseMainHeader({accounts,setLoading,currentUser,setCurrentUser}) {
    

    const headerVideoRef = useRef(null)
    const [headerVideo,setHeaderVideo] = useState(null)
    const [isPlaying,setPlaying] = useState(false)
    const [headerImage,setHeaderImage] = useState(null)
    const [headerLogo,setHeaderLogo] = useState(null)


    const [videoState,setVideoState] = useState({
        muted:true,
        hasPlayed:false
    })

    const [movieInformation,setMovieInformation] = useState({
        title:"",
        overview:"",
        adult:false
    })

    const imgHide = async(e)=>{
        setPlaying(p=>true)
        setVideoState({
            muted:true,
            hasPlayed:true
        })
    }
    const imgShow = (e) =>{
        setPlaying(p=>false)
    }
    const restartVideo = () =>{
        headerVideoRef.current.seekTo(0,'seconds')
    }
    const changeActionIcon = () =>{
        if(videoState.muted && isPlaying)
        setVideoState({muted:false,hasPlayed:true})
        else if(!videoState.muted && isPlaying)
        setVideoState({muted:true,hasPlayed:true})
        else if(videoState.hasPlayed&&!isPlaying)
        restartVideo()
    }
    const getHeaderInfo = async ()=>{
        setPlaying(false)
        setVideoState({
            muted:true,
            hasPlayed:false
        })
        setHeaderVideo('')

        const base_url=sessionStorage.getItem('base_url')

        var url=`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
        const popular = await axios.get(url)
        const popularMovie= popular.data.results[getRandomInt(0,popular.data.results.length-1)]
        const {adult,title,overview,backdrop_path,id} = popularMovie
        
        setMovieInformation({
            title:title,
            overview:overview,
            adult:adult
        })
        url=`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`

        const logos = await axios.get(url)
        console.log(logos);
        const logoUrl = logos.data.logos[0] ?logos.data.logos[0].file_path : null



        url=`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        const videos = axios.get(url).then(async (res)=>{
            var video = '';
            for(let i=0;i<res.data.results.length;i++)
            {
                if(res.data.results[i].type=="Trailer")
                {
                    video = res.data.results[i]
                    break
                }
            }
            if(!video)
            {
            let RI = getRandomInt(0,res.data.results.length-1)
            video = res.data.results[RI]
            }
            await sleep(2000)
            if(video)
            setHeaderVideo(p=>video.key)
        })        
        
        if(logoUrl)
        {
        const urlPoster=base_url+"original"+logoUrl
        setHeaderLogo(urlPoster)
        }
        else{
        setHeaderLogo(false)
        }
        const urlImages=base_url+"original"+backdrop_path
        setHeaderImage(urlImages)
    }  
    useEffect(()=>{
        try{
                getHeaderInfo()
                const yt = new YouTubeToHtml5({
                    withAudio:false
                })

    }
    catch(e)
    {
        console.log(e);
    }
    },[currentUser])
  return (
    <div className="browseMain-headerContainer">
    <div className="headerContainer-posterContainer"> 
        <img src={headerImage} style={{opacity:isPlaying?"0":"1"}} onLoad={()=>{setLoading(false)}}></img>
        <ReactPlayer wrapper='none' ref={headerVideoRef} url={`https://www.youtube.com/watch?v=${headerVideo}`} playing={isPlaying} onPlay={e=>imgHide(e)} onEnded={imgShow} playing={true} muted={videoState.muted} controls={false}/>
        <div className="browseMain-filler1"  style={{opacity:isPlaying?"0":"1"}}>
        </div>
    </div>
    <BrowseMainNavbar setCurrentUser={setCurrentUser} currentUser={currentUser} accounts={accounts} setLoading={setLoading}/>
        <div className="browserMain-infoContainer">
            <div>
                <div className="browserMain-info"> 
                    {headerLogo?<img src={headerLogo} style={{transform:isPlaying?"scale(0.6) translate3d(0px, 0px, 0px)":"scale(1) translate3d(0px, 0px, 0px)"}}></img>:<h3 style={{transform:isPlaying?"scale(0.6) translate3d(0px, 0px, 0px)":"scale(1) translate3d(0px, 0px, 0px)"}}>{movieInformation.title}</h3>}
                    <p style={{maxHeight:isPlaying?"0px":"1200px"}}>{movieInformation.overview}</p>
                    <div className="browserMain-infoButtons">
                        <button className="playButton">
                            <Play/>
                            Play</button>
                        <button className="moreInfoButton">
                            <MoreInfo/>
                            More Info</button>
                    </div>
                </div>
            </div>
        </div>

    <div className="headerContainer-actionsButtons">
        <span>{movieInformation.adult?"18+":"13+"}</span>
            <div className="actionsButtons-sound" style={{visibility:videoState.hasPlayed?"visible":"hidden"}} onClick={changeActionIcon}>
                {videoState.muted && isPlaying &&<Muted />}
                {!videoState.muted && isPlaying &&<Unmuted />}
                {videoState.hasPlayed&&!isPlaying&&<Reload />}
            </div>
    </div>
    </div>
    
  );
}

