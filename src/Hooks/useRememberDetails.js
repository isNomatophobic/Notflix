import { useEffect, useState } from "react"
import axios from "axios"

const useRememberDetails = (id)=>{
    const [matchedDetails,setMatchedDetails] = useState({})
    const getInformation = async(id)=>{
        try {
          let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
          const information = await axios.get(url)
          const details = {
            adult:information.data.adult,
            genres:information.data.genres,
            runtime:information.data.runtime
          }
          return details;
        } catch (error) {
          
        }
      }
    const assignInformation = async()=>{
        if(!(id in matchedDetails))
        {
            await getInformation(id).then((res)=>{
                let newObj = {matchedDetails}
                newObj[id]=res
                setMatchedDetails(p=>newObj)
            })
        }
    }
    useEffect(()=>{
        return assignInformation()
    },[id])

    return matchedDetails[id]
}
export default useRememberDetails