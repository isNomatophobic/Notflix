import { useState, useEffect } from "react";
import BrowseMainSection from "./BrowseMainSection";
import ReactPlayer from "react-player/lazy";
import getRandomInt from "Helpers/getRandomInt";
import axios from "axios";

export default function BrowseMainPreview({url,id,currentHovered,setCurrentHovered,isSliding}) {
  const [movieVideoUrl, setMovieVideoUrl] = useState("");
  const [isHovered, setHovered] = useState(false);
  const [styles, setStyles] = useState({});

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
        if (video) setMovieVideoUrl((p) => video.key);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const remove = () => {
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
    window.addEventListener("resize", remove);
    if (isSliding) remove();
    if (!isSliding) {
      fetchVideo();
      const styles = {
        top: currentHovered.y,
        left: currentHovered.x,
        width: currentHovered.width,
        height: currentHovered.height,
        animationName: `appear`,
        animationDuration: `1s`,
      };
      setStyles((p) => styles);
    }
    return () => window.removeEventListener("resize", remove);

  }, [currentHovered, isSliding]);
  return (
    <div
      className="browseMain-PreviewContainer"
      onMouseLeave={remove}
      style={styles}
    >
      <div className="lol"></div>
      {/* <img src={currentHovered.imgUrl}></img>
      <ReactPlayer
        wrapper="div"
        url={`https://www.youtube.com/watch?v=${movieVideoUrl}`}
        playing={true}
        muted={true}
        controls={false}
        height="100%"
        width="100%"
        style={{ position: `relative` }}
      /> */}
    </div>
  );
}
