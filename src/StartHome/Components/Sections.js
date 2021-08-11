import {useState} from 'react'
import List from "../../assets/sectionList"
import Section from "./SectionsComponents/Section"
function Sections()
{
    const[sectionsObj,setSections] = useState(List)
    var arrayOfSections=sectionsObj.map((data)=>{
        return <Section key={data.id} id={data.id} title={data.title} 
        text={data.text} image={data.image}
        direction={data.direction}
        video={data.video}
        />
    })
    return(
        <div className="sections-container">
            {arrayOfSections}
        </div>
    );
}
export default Sections