import { useEffect, useState } from "react"
import axios from "axios"
import getRandomInt from "Helpers/getRandomInt"

const useRememberVideos = (id)=>{
    const [matchedVideos,setMatchedVideos] = useState({})
    const fetchVideo = async() => {
        try {
          let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
          const res = await axios.get(url)
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
            return video.key
            
        } catch (e) {
          console.log(e);
        }
      };
    const assignVideo = async()=>{
        if (id == "" || id in matchedVideos) return;
        await fetchVideo().then((res)=>{
            let videos = matchedVideos
            videos[id]=res
            setMatchedVideos(p=>videos)
        })
    }
    useEffect(()=>{
        return assignVideo()

    },[id])
    return matchedVideos[id]
}
export default useRememberVideos