export default function debaunce (fn,delay){
    let timeID
    return function (...args)
    {
        let check = [...args]
        if(timeID||check[0]=="clear")
        {
            clearTimeout(timeID)
        }
        timeID= setTimeout(()=>{
            fn(...args)
        },delay)
    }
}