function Section({ id, title, text, image, video, direction }) {
  console.log("Logged Output:: key", id);
  if (direction == 0) {
    return (
      <div className="section">
        <div className="section-container">
          <div className="section-textWrapper">
            <h1>{title}</h1>
            <h2>{text}</h2>
          </div>
          <div className="section-imgWrapper">
            <img src={`./Images/${image}`} alt="error"></img>
            <div
              className={
                video === "video-tv.m4v"
                  ? "sectionAnimation-container tvVideo"
                  : "sectionAnimation-container itemsVideo"
              }
            >
              <video autoplay="" playsinline="" loop="true" muted="true">
                <source src={`./Videos/${video}`} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="section">
        <div className="section-container section1">
          <div className="section-imgWrapper">
            <img src={`./Images/${image}`} alt="error"></img>
            <div
              className="phoneAnimation"
              style={{ display: id == 1 ? "flex" : "none" }}
            >
              <div className="phoneAnimation-imgContainer">
                <img src="./Images/boxshot.png"></img>
              </div>
              <div className="phoneAnimation-textContainer">
                <h2>Stranger Things</h2>
                <p>Downloading...</p>
              </div>
              <div className="phoneAnimation-gifContainer"></div>
            </div>
          </div>
          <div className="section-textWrapper">
            <h1>{title}</h1>
            <h2>{text}</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default Section;
