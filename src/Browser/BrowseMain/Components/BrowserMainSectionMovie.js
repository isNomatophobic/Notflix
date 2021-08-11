import axios from "axios"
import {useEffect, useRef, useState} from "react"

export default function BrowserMainSectionMovie({vote,url,id,setCurrentHovered}) {

        const [hovered,setHovered] = useState(false)
        const posterRef = useRef('')
        const [boundingInfo,setBoundingInfo] = useState({
            width:0,
            height:0,
            x:0,
            y:0
        })
        const searchBounding = ()=>{
            const newInfo = {
                width:posterRef.current.getBoundingClientRect().width,
                height:posterRef.current.getBoundingClientRect().height,
                x:posterRef.current.getBoundingClientRect().left,
                y:posterRef.current.getBoundingClientRect().top
            }
            setBoundingInfo(p=>newInfo)
            setCurrentHovered({id:id,imgUrl:url,x:boundingInfo.x,y:boundingInfo.y,width:boundingInfo.width,height:boundingInfo.height})
        }
        useEffect(()=>{
            searchBounding()
        },[])
        return (
                <div className={`section-MovieContainer ${boundingInfo.x}`}> 
                    <div ref={posterRef} className="MovieContainer-posters" onMouseEnter={searchBounding}>
                        <img src={url}></img>
                    </div>
                </div>
        );
    }


