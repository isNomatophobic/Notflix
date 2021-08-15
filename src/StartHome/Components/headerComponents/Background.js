function Background(p) {
  console.log(p.bgStyle);
  var srcset =
    "https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/61cf7e50-dc7d-44f7-bc6f-805460788015/BG-en-20210607-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/61cf7e50-dc7d-44f7-bc6f-805460788015/BG-en-20210607-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/61cf7e50-dc7d-44f7-bc6f-805460788015/BG-en-20210607-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w";
  return (
    <div
      className={p.bgAuto ? "imageWrapper-login imageWrapper" : "imageWrapper"}
      style={{ height: p.height }}
    >
      <img src="./Images/header-backgroundImage.jpg" srcset={srcset}></img>
      <div
        className="backgroundImage-container"
        style={{ background: p.bgStyle }}
      />
    </div>
  );
}

export default Background;
