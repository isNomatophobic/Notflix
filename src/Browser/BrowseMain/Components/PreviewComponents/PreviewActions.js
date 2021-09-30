import React from 'react'
import {ReactComponent as Play} from "assets/play.svg" 
import {ReactComponent as Tick} from "assets/tick.svg" 
import {ReactComponent as Thumb} from "assets/thumb.svg" 
import { ReactComponent as Arrow } from "assets/arrow.svg";


export default function PreviewActions({pushMovie,setDetailed,isDetailed}) {
    return (
        <div className="HiddenContainer-ActionButtons">
            <div className="ActionButtons Left">
            <div className="ActionButtons-Button ActionButtons-Play" onClick={pushMovie}>
                <Play/> {isDetailed?<p>Play</p>:null}
            </div>
            <div className="ActionButtons-Button">
                <Tick/>
            </div>
            <div className="ActionButtons-Button">
                <Thumb/>
            </div>
            <div className="ActionButtons-Button Reversed">
                <Thumb/>
            </div>
            </div>
            <div className="ActionButtons Right">
            {!isDetailed? <div className="ActionButtons-Button" onClick={()=>setDetailed(p=>true)}>
                <Arrow />
            </div> : null}
        </div>
      </div>
    )
}
