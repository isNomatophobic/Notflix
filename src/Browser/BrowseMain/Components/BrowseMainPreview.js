import { useState, useEffect, useRef } from "react";
import PreviewPoster from "./PreviewComponents/PreviewPoster"
import BrowseMainSection from "./BrowseMainSection";
import ReactPlayer from "react-player/lazy";
import sleep from "Helpers/sleep"
import useRememberDetails from "Hooks/useRememberDetails"
import useRememberVideo from "Hooks/useRememberVideo"


import {ReactComponent as Play} from "assets/play.svg" 
import {ReactComponent as Tick} from "assets/tick.svg" 
import {ReactComponent as Thumb} from "assets/thumb.svg" 
import { ReactComponent as Arrow } from "assets/arrow.svg";



export default function BrowseMainPreview({url,id,currentHovered,setCurrentHovered,isSliding,history}) {
  const [isPlaying, setPlaying] = useState(false);
  const [styles, setStyles] = useState({});
  const [isHovered,setHovered]= useState(false)
  const details = useRememberDetails(currentHovered.id)
  const movieVideoUrl = useRememberVideo(currentHovered.id)

  const remove = async () => {
    setHovered(p=>false)
    await sleep(300)
    setPlaying(p=>false)
    const styles = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      display: "none",
    };
    setStyles((p) => styles);
  };
  const pushMovie = ()=>{
    if(movieVideoUrl)
    history.push({
      pathname:'/browse/watch',
      state:{movieVideoUrl:movieVideoUrl}
    })
  }
  
  useEffect(() => {
    console.log(currentHovered);
    setPlaying(p=>false)
    window.addEventListener("resize", remove);
    if (isSliding||currentHovered.id == "") remove();
    if (!isSliding) {
      const styles = {
        transformOrigin:currentHovered.position,
        top: currentHovered.y,
        left: currentHovered.x,
        width: currentHovered.width,
        height: currentHovered.height,
      };
      setStyles((p) => styles)
    }
    return () => window.removeEventListener("resize", remove);

  }, [currentHovered, isSliding]);

  return (
    <div
      className={`browseMain-PreviewContainer ${isHovered?"grow":""}`}
      onMouseEnter={()=>setHovered(p=>true)}
      onMouseLeave={remove}
      style={{top:styles.top,left:styles.left,display:styles.display,transformOrigin:styles.transformOrigin}}
    >
      
      <div>
        <PreviewPoster movieVideoUrl={movieVideoUrl} isHovered={isHovered} setPlaying={setPlaying} isPlaying={isPlaying} dimensions={{height:styles.height,width:styles.width}} currentHovered={currentHovered}/>
        {isHovered?
        <div className="PreviewContainer-HiddenContainer">
          <div className="HiddenContainer-ActionButtons">
            <div className="ActionButtons Left">
              <div className="ActionButtons-Button ActionButtons-Play" onClick={pushMovie}>
                <Play/>
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
              <div className="ActionButtons-Button">
                <Arrow/>
              </div>
          </div>
          </div>
          {details&&isHovered?
          <>
          <div className="HiddenContainer-Info">
            <span className="Info-VoteAverage">{`${details.vote*10}% Match`}</span>
            <span className="Info-AgeRating">{details.adult?"18+":"13+"}</span>
            <span className="Info-Runtime">{`${details.runtime}`}</span>
          </div>
          
          <div className="HiddenContainer-Genres">
            {details.genres.map((item)=><span className="Genres-Item">{item}</span>)}
          </div>
          </>
          :null}
        </div>
        :null}
      </div>  
    </div>
  );
}
