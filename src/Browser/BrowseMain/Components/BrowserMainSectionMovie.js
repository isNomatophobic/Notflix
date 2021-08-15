import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function BrowserMainSectionMovie({vote,url,id,setCurrentHovered,index,hasSlided,isSliding}) {
  const posterRef = useRef("");
  const [boundingInfo, setBoundingInfo] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const searchBounding = () => {
    
    if(isSliding) return

    const newInfo = {
      width: posterRef.current.getBoundingClientRect().width,
      height: posterRef.current.getBoundingClientRect().height,
      x: posterRef.current.getBoundingClientRect().left,
      y: posterRef.current.getBoundingClientRect().top,
    };
    if(newInfo.x<=0||newInfo.x+newInfo.width>=window.innerWidth){
      const currentHovered = {
        id: '',
        imgUrl: 'url',
        x: 999999, 
        y: 999999,
        width: 0,
        height: 0,
      };
      setCurrentHovered((p) => currentHovered);
      return
    }

    console.log(newInfo);
    setBoundingInfo((p) => newInfo);
    const currentHovered = {
      id: id,
      imgUrl: url,
      x: newInfo.x, 
      y: newInfo.y,
      width: newInfo.width,
      height: newInfo.height,
    };
    setCurrentHovered((p) => currentHovered);

    }
  ;
  useEffect(() => {
    searchBounding();
  }, [window.innerHeight, window.innerWidth]);
  return (
    <div className={`section-MovieContainer ${boundingInfo.y}`}>
      <div
        ref={posterRef}
        className="MovieContainer-posters"
        onMouseEnter={searchBounding}
      >
        <img src={url}></img>
      </div>
    </div>
  );
}
