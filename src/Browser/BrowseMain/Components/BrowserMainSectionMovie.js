import axios from "axios";
import debounce from "Helpers/debounce"
import useHover from "Hooks/useHover"
import useDebounce from "Hooks/useDebounce"
import { useEffect, useRef, useState,useMemo } from "react";

export default function BrowserMainSectionMovie({url,id,isSliding,debouncedHandle}) {
  const posterRef = useRef("");
  const [boundingInfo, setBoundingInfo] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [hoverRef, isHovered] = useHover();
  const debounced = useDebounce(isHovered,300)

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  const debouncedHandleResize= debounce(handleResize,100)
  const searchBounding = () => {
      if(isSliding) return

    const newInfo = {
      width: posterRef.current.getBoundingClientRect().width,
      height: posterRef.current.getBoundingClientRect().height,
      x: posterRef.current.getBoundingClientRect().left,
      y: posterRef.current.getBoundingClientRect().top+window.pageYOffset,
    };
    setBoundingInfo((p) => newInfo);
    }
    useEffect(() => {
      window.addEventListener("resize", debouncedHandleResize, false);
      searchBounding();

  }, [dimensions]);
  useEffect(()=>{
    debouncedHandle(boundingInfo.width,boundingInfo.height,boundingInfo.x,boundingInfo.y,id,url); 

  },[debounced])
  return (
    <div ref={hoverRef} className={`section-MovieContainer ${boundingInfo.y}`}>
      <div
        ref={posterRef}
        className="MovieContainer-posters"
        onMouseEnter={(e)=>{searchBounding();}}
      >
        <img src={url}></img>
      </div>
    </div>
  );
}
