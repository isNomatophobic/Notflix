import BrowseMainSection from "./BrowseMainSection";
export default function BrowseMainSections({
  accounts,
  setCurrentHovered,
  setSliding,
  isSliding
}) {
  return (
    <div className="browseMain-SectionsContainer">
      <BrowseMainSection
        sectionTitle={"Popular on Netflix"}
        keyword={"popular"}
        setCurrentHovered={setCurrentHovered}
        setSliding={setSliding}
        isSliding={isSliding} />
      {/* <BrowseMainSection sectionTitle={"Test1"} keyword={"top_rated"}/> */}
    </div>
  );
}
