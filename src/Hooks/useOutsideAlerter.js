import {useEffect, useState} from "react"
export function useOutsideAlerter(ref) {
    const [outside,setOutside] = useState(true)
    useEffect(() => {

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutside(p=>true)
            }
            else setOutside(p=>false)
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return outside
}
