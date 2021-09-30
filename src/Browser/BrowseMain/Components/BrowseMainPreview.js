import { useState, useEffect, useRef } from "react";
import PreviewPoster from "./PreviewComponents/PreviewPoster"
import PreviewHidden from "./PreviewComponents/PreviewHidden"
import sleep from "Helpers/sleep"
import useRememberVideo from "Hooks/useRememberVideo"
import {useOutsideAlerter} from "Hooks/useOutsideAlerter"






export default function BrowseMainPreview({url,id,currentHovered,setCurrentHovered,isSliding,history}) {
  const [isPlaying, setPlaying] = useState(false);
  const [styles, setStyles] = useState({});
  const [isHovered,setHovered]= useState(false)
  const movieVideoUrl = useRememberVideo(currentHovered.id)
  const [isDetailed,setDetailed] = useState(false)
  const previewContainer = useRef(null)
  const outside = useOutsideAlerter(previewContainer)
  useEffect(()=>{
      if(outside && isDetailed) setDetailed(p=>false)
  },[outside])    

  //Use isDetailed to change styles.
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

  useEffect(() => {
    setDetailed(p=>false)
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
    <div className={`PreviewMain ${isDetailed?'PreviewMain-Dark':''}`}>
      <div
        className={`browseMain-PreviewContainer ${isHovered&&!isDetailed?"grow":""} ${isDetailed? "PreviewDetailed":""}`}
        onMouseEnter={()=>setHovered(p=>true)}
        onMouseLeave={remove}
        style={ !isDetailed?(({ height, ...o }) => o)(styles):null }
        ref={previewContainer}
      >
        <div>
          <PreviewPoster isDetailed={isDetailed} movieVideoUrl={movieVideoUrl} isHovered={isHovered} setPlaying={setPlaying} isPlaying={isPlaying} dimensions={{height:styles.height,width:styles.width}} currentHovered={currentHovered}/>
          <PreviewHidden movieVideoUrl={movieVideoUrl} currentHovered={currentHovered} isHovered={isHovered} isDetailed={isDetailed} setDetailed={setDetailed}/>
        </div>  
      </div>
    </div>
  );
}
