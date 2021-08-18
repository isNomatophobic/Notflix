export default function debaunce (fn,delay){
    let timeID
    return function (...args)
    {
        if(timeID)
        {
            clearTimeout(timeID)
        }
        timeID= setTimeout(()=>{
            fn(...args)
        },delay)
    }
}