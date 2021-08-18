import BrowseMainSection from "./BrowseMainSection";
import debounce from "Helpers/debounce"
export default function BrowseMainSections({
  accounts,
  setCurrentHovered,
  setSliding,
  isSliding
}) {
  const handleHover= (width,height,x,y,id,url)=>{
    if(isSliding) return


    if(x<=0||x+width>=window.innerWidth){
      const currentHovered = {
        id: '',
        imgUrl: 'url',
        x: 999999, 
        y: 999999,
        width: 0,
        height: 0,
      };
      setCurrentHovered((p) => currentHovered);
      return
    }
    const currentHovered = {
      id: id,
      imgUrl: url,
      x: x, 
      y: y,
      width: width,
      height: height,
    };
    setCurrentHovered((p) => currentHovered);
  }
  const debouncedHandle  = debounce(handleHover,300)
  return (
    <div className="browseMain-SectionsContainer">
      <BrowseMainSection
        sectionTitle={"Popular on Netflix"}
        keyword={"popular"}
        setCurrentHovered={setCurrentHovered}
        setSliding={setSliding}
        isSliding={isSliding} 
        debouncedHandle={debouncedHandle}/>
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
