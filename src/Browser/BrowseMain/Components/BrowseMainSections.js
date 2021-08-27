import BrowseMainSection from "./BrowseMainSection";
import debounce from "Helpers/debounce"
import useMousePosition from "Hooks/useMousePosition"

export default function BrowseMainSections({
  accounts,
  setCurrentHovered,
  setSliding,
  isSliding
}) {

  const handleHover= (width,height,x,y,id,url)=>{
    if(isSliding) return

    let position="center"
    if(x<=0||x+width>=window.innerWidth){
      const currentHovered = {
        id: '',
        imgUrl: 'url',
        x: 0, 
        y: 0,
        width: 0,
        height: 0,
        position:'none'
      }
      setCurrentHovered((p) => currentHovered);
      return
    }
    else if(x+width*1.7>=window.innerWidth) position="right"
    else if(x-(width*1.7)/2<=0) position="left"
    const currentHovered = {
      id: id,
      imgUrl: url,
      x: x, 
      y: y,
      width: width,
      height: height,
      position:position
    };
    setCurrentHovered((p) => currentHovered);
  }
  const debouncedHandle  = debounce(handleHover,1)
  return (
    <div className="browseMain-SectionsContainer">
      <BrowseMainSection
        sectionTitle={"Popular on Netflix"}
        keyword={"popular"}
        setCurrentHovered={setCurrentHovered}
        setSliding={setSliding}
        isSliding={isSliding} 
        debouncedHandle={handleHover}
        />
        <BrowseMainSection
        sectionTitle={"Popular on Netflix"}
        keyword={"top_rated"}
        setCurrentHovered={setCurrentHovered}
        setSliding={setSliding}
        isSliding={isSliding} 
        debouncedHandle={debouncedHandle}/>
    </div>
  );
}
