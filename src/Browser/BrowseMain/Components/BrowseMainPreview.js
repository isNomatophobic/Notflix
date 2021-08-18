import { useState, useEffect, useRef } from "react";
import BrowseMainSection from "./BrowseMainSection";
import ReactPlayer from "react-player/lazy";
import getRandomInt from "Helpers/getRandomInt";
import axios from "axios";
import sleep from "Helpers/sleep"
import debounce from "Helpers/debounce"

export default function BrowseMainPreview({url,id,currentHovered,setCurrentHovered,isSliding}) {
  const [movieVideoUrl, setMovieVideoUrl] = useState("");
  const [isPlaying, setPlaying] = useState(false);
  const [styles, setStyles] = useState({});
  const [isHovered,setHovered]= useState(false)

  const fetchVideo = () => {
    if (currentHovered.id == "") return;
    try {
      url = `https://api.themoviedb.org/3/movie/${currentHovered.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
      const videos = axios.get(url).then(async (res) => {
        var video = "";
        for (let i = 0; i < res.data.results.length; i++) {
          if (res.data.results[i].type == "Trailer") {
            video = res.data.results[i];
            break;
          }
        }
        if (!video) {
          let RI = getRandomInt(0, res.data.results.length - 1);
          video = res.data.results[RI];
        }
        if (video)
        {
        console.log("Playing!");
        setMovieVideoUrl((p) => video.key);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const remove = async () => {
    setHovered(p=>false)
    await sleep(300)
    setMovieVideoUrl(p=>"")
    setPlaying(p=>false)
    const styles = {
      top: 99999,
      left: 99999,
      width: 0,
      height: 0,
      display: "none",
    };
    setStyles((p) => styles);
  };
  useEffect(() => {

    setPlaying(p=>false)
    window.addEventListener("resize", remove);
    if (isSliding) remove();
    if (!isSliding) {
      fetchVideo();
      const styles = {
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
      style={styles}
    >
      <div className="PreviewContainer-PosterContainer">
        <img src={currentHovered.imgUrl} style={{opacity:isPlaying?"0":"1"}}></img>
        <ReactPlayer
          wrapper="div"
          url={`https://www.youtube.com/watch?v=${movieVideoUrl}`}
          playing={true}
          muted={true}
          controls={false}
          height="100%"
          width="100%"
          onPlay={()=>setPlaying(p=>true)}
          style={{ position: `relative` }}
          />
      </div>
      <div className="PreviewContainer-HiddenContainer">
        
      </div>
    </div>
  );
}
