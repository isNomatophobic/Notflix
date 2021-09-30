import React from 'react'
import PreviewDetails from "./PreviewDetails"
import PreviewActions from "./PreviewActions"
import { useHistory } from 'react-router-dom'
import useRememberDetails from "Hooks/useRememberDetails"

export default function PreviewHidden({movieVideoUrl,currentHovered,isHovered,isDetailed,setDetailed}) {
    console.log("Logged Output:: PreviewHidden -> isDetailed", isDetailed)
    const history = useHistory()
    const pushMovie = ()=>{
        if(movieVideoUrl)
        history.push({
          pathname:'/browse/watch',
          state:{movieVideoUrl:movieVideoUrl}
        })
      }
    const details = useRememberDetails(currentHovered.id)
    return (
        <div className="PreviewContainer-Dissapear" style={{visibility:!isHovered&&!isDetailed?"hidden":"visible"}}>
            <div className="PreviewContainer-HiddenContainer">
                <PreviewActions pushMovie={pushMovie} setDetailed={setDetailed} isDetailed={isDetailed}/>
                {details? <PreviewDetails details={details} currentHovered={currentHovered} isDetailed={isDetailed} isHovered={isHovered} /> : null}
            </div>
      </div>
    )
}
