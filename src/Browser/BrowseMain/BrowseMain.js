import "./BrowseMain-Styles.css";
import { useEffect, useRef, useState } from "react";
import BrowseMainHeader from "./Components/BrowseMainHeader";
import BrowseMainSections from "./Components/BrowseMainSections";
import BrowseMainPreview from "./Components/BrowseMainPreview";

import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

console.log(new Error().stack);
function BrowseMain({ accounts }) {
  const location = useLocation();
  console.log(location.state);
  const currentImage = location.state
    ? location.state.currentImage
    : "107 - LJ9dB0T";
  const currentName = location.state ? location.state.currentName : "Guest";
  const [currentUser, setCurrentUser] = useState({
    userName: currentName,
    userImage: currentImage,
  });
  const [currentHovered, setCurrentHovered] = useState({
    id: "",
    imgUrl: "",
    X: 0,
    Y: 0,
    width: 0,
    height: 0,
  });
  const [isSliding, setSliding] = useState(false);
  const [baseUrl,setBaseUrl] = useState(null)
  const getBase = async () => {
    const url = `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_API_KEY}`;
    const res = await axios.get(url);
    sessionStorage.setItem("base_url",res.data.images.base_url);
    setBaseUrl(p=>res.data.images.base_url)
  };
  useEffect(() => {
    getBase();
  }, []);

  const [isLoading, setLoading] = useState(true);

  return (
    <div className="browseMain">
      {baseUrl ? (
        <div className="loadedContent">
          <BrowseMainHeader
            accounts={accounts}
            setLoading={setLoading}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <BrowseMainSections
            setCurrentHovered={setCurrentHovered}
            setSliding={setSliding}
            isSliding={isSliding}

          />
          <BrowseMainPreview
            isSliding={isSliding}
            currentHovered={currentHovered}
          />
        </div>
      ) : null}
      <div
        className="loadingScreen"
        style={{ display: isLoading ? "block" : "none" }}
      >
        <div className="preloader">
          <div>
            <img
              src={`/Images/profileImages/${currentUser.userImage}.png`}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseMain;
