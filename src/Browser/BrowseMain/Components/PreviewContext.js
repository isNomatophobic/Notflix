import {useState,useContext} from "react"

const PreviewContext= React.createContext()

export default function PreviewContext() {
    const [styles, setStyles] = useState({});
    //Make a plan in the whiteboard. 
    return (
        <PreviewContext.Provider>
            {children}
        </PreviewContext.Provider>
    )
}
