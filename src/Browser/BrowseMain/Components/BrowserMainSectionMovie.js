import axios from "axios";
import debounce from "Helpers/debounce"
import { useEffect, useRef, useState,useMemo } from "react";

export default function BrowserMainSectionMovie({vote,url,id,setCurrentHovered,index,hasSlided,isSliding,debouncedHandle}) {
  const posterRef = useRef("");
  const [boundingInfo, setBoundingInfo] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const searchBounding = () => {
    console.log("bounce");
    if(isSliding) return

    const newInfo = {
      width: posterRef.current.getBoundingClientRect().width,
      height: posterRef.current.getBoundingClientRect().height,
      x: posterRef.current.getBoundingClientRect().left,
      y: posterRef.current.getBoundingClientRect().top+window.pageYOffset,
    };

    setBoundingInfo((p) => newInfo);

    }
  const debouncedSearch = useMemo(() => debounce(searchBounding, 300), []);
  useEffect(() => {
    searchBounding();
  }, [window.innerHeight, window.innerWidth]);
  return (
    <div className={`section-MovieContainer ${boundingInfo.y}`}>
      <div
        ref={posterRef}
        className="MovieContainer-posters"
        onMouseEnter={()=>{searchBounding();debouncedHandle(boundingInfo.width,boundingInfo.height,boundingInfo.x,boundingInfo.y,id,url);}}
      >
        <img src={url}></img>
      </div>
    </div>
  );
}
