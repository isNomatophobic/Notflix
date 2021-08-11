import BrowseMainSection from "./BrowseMainSection"
export default function BrowseMainSections({accounts,setCurrentHovered}) {

        return (
            <div className="browseMain-SectionsContainer">
                <BrowseMainSection sectionTitle={"Popular on Netflix"} keyword={"popular"} setCurrentHovered={setCurrentHovered}/>
                {/* <BrowseMainSection sectionTitle={"Test1"} keyword={"top_rated"}/> */}
            </div>
        );
    }

