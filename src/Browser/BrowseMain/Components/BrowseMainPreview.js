import { useState,useEffect } from "react";
import BrowseMainSection from "./BrowseMainSection"
import ReactPlayer from 'react-player/lazy'
import getRandomInt from "../../../Helpers/getRandomInt"
import axios from "axios"

export default function BrowseMainPreview({url,id,currentHovered,setCurrentHovered}) {
    const [movieVideoUrl,setMovieVideoUrl] = useState('')
    const [isHovered,setHovered] = useState(false)
    const [styles,setStyles] = useState({
        top:currentHovered.y,
        left:currentHovered.x,
        width:currentHovered.width,
        height:currentHovered.height
    })
    console.log(currentHovered);
    const fetchVideo = () =>{
        if(currentHovered.id=='') return

        try{

        

        url=`https://api.themoviedb.org/3/movie/${currentHovered.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
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
        if(video)
        setMovieVideoUrl(p=>video.key)
        console.log("video");
    })        
    }
    catch(e)
    {
        console.log(e);
    }
    }
    const remove = ()=>{
        setStyles({        top:99999,
            left:99999,
            width:0,
            height:0,
        display:'none'})
    }
    useEffect(() => {
        fetchVideo()
        setStyles({        top:currentHovered.y,
            left:currentHovered.x,
            width:currentHovered.width,
            height:currentHovered.height})
    }, [currentHovered])
        return (
            <div className="browseMain-PreviewContainer" onMouseLeave={remove} style={styles}>
                <img src={currentHovered.imgUrl}></img>
                <ReactPlayer wrapper='div'url={`https://www.youtube.com/watch?v=${movieVideoUrl}`}   playing={true} muted={true} controls={false} height="100%" width="100%" style={{position:`relative`}}/>
            </div>
        );
    }

