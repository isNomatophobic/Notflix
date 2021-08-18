import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import useWindowDimensions from "Hooks/useWindowDimensions";
import BrowseMainSectionMovie from "./BrowserMainSectionMovie";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default function BrowseMainSections({
  sectionTitle,
  keyword,
  setCurrentHovered,
  setSliding,
  isSliding,
  debouncedHandle
}) {
  const { height, width } = useWindowDimensions();
  const [hasSlided, setHasSlided] = useState(false);
  const [sectionMovies, setSectionMovies] = useState(null);
  const moviesContainer = useRef(null);
  const [slidePosition, setSlidePosition] = useState(0);
  
  const fetchMovies = async () => {
    const base_url = sessionStorage.getItem("base_url");
    const url = `https://api.themoviedb.org/3/movie/${keyword}?api_key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(url);
    const movies = response.data.results;
    console.log("Logged Output:: fetchMovies -> movies", movies);

    const jsxArray = movies.map((movie, i = 0) => {
      const url = base_url + "original" + movie.backdrop_path;
      console.log(url);
      return (
        <BrowseMainSectionMovie
          hasSlided={hasSlided}
          index={i}
          url={url}
          vote={movie.vote_average}
          id={movie.id}
          setCurrentHovered={setCurrentHovered}
          isSliding={isSliding}
          debouncedHandle={debouncedHandle}
        />
      );
    });
    setSectionMovies(jsxArray);
  };
  const slide = async (e) => {
    setSliding((p) => true);
    const currentHovered = {
      id: "4723",
      imgUrl: "url",
      x: "9999",
      y: "9999".y,
      width: "0",
      height: "0",
    };
    setCurrentHovered((p) => currentHovered);
    var newSection = [];
    moviesContainer.current.style.transition = "all 0.75s ease-out";

    if (e.target.classList.contains("section-ArrowRight")) {
      if (width < 1100) {
        if (!hasSlided) setSlidePosition(-92);
        if (hasSlided) setSlidePosition(-114.8);
      }
      if (width >= 1100) {
        if (!hasSlided) setSlidePosition(-92);
        if (hasSlided) setSlidePosition(-107.4);
      }
      if (width <= 600) {
        if (!hasSlided) setSlidePosition(-92);
        if (hasSlided) setSlidePosition(-137.5);
      }
      newSection = sectionMovies.map((movie) => movie);
      if (width >= 1100)
        for (let i = 0; i < 6; i++) {
          if (i <= 4 && !hasSlided) {
            newSection.push(newSection.shift());
            console.log();
          }
          if (i <= 5 && hasSlided) {
            newSection.push(newSection.shift());
          }
        }
      else if (width > 600)
        for (let i = 0; i < 4; i++) {
          if (i <= 2 && !hasSlided) {
            newSection.push(newSection.shift());
            console.log();
          }
          if (i <= 3 && hasSlided) {
            newSection.push(newSection.shift());
          }
        }
      else
        for (let i = 0; i < 2; i++) {
          if (i <= 0 && !hasSlided) {
            newSection.push(newSection.shift());
            console.log();
          }
          if (i <= 1 && hasSlided) {
            newSection.push(newSection.shift());
          }
        }

      console.log(newSection);
      await sleep(750);
      moviesContainer.current.style.transition = "none";

      if (width < 1100) setSlidePosition(-23);
      if (width <= 600) setSlidePosition(-45.5);
      if (width >= 1100) setSlidePosition(-15.4);

      setSectionMovies(newSection);
    } else if (e.target.classList.contains("section-ArrowLeft")) {
      newSection = sectionMovies.map((movie) => movie);
      if (width < 1100 && width > 600)
        for (let i = 0; i < 4; i++) {
          newSection.unshift(newSection[newSection.length - 1]);
          newSection.pop();
        }

      if (width >= 1100)
        for (let i = 0; i < 6; i++) {
          newSection.unshift(newSection[newSection.length - 1]);
          newSection.pop();
        }
      if (width <= 600)
        for (let i = 0; i < 2; i++) {
          newSection.unshift(newSection[newSection.length - 1]);
          newSection.pop();
        }
      setSectionMovies(newSection);
      moviesContainer.current.style.transition = "none";
      if (width < 1100) setSlidePosition(-114.8);
      if (width <= 600) setSlidePosition(-137.5);
      if (width >= 1100) setSlidePosition(-107.3);
      await sleep(10);
      moviesContainer.current.style.transition = "all 0.3s ease-out";

      if (width < 1100) setSlidePosition(-23.2);
      if (width <= 600) setSlidePosition(-45.5);
      if (width >= 1100) setSlidePosition(-15.3);
    }
    setHasSlided(true);
    setSliding((p) => false);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  const handleHover= (width,height,x,y)=>{

  }
  return (
    <div className="browseMain-Section">
      <h2>{sectionTitle}</h2>
      <div className="section-MoviesContainer">
        <div
          ref={moviesContainer}
          className="movies"
          style={{ transform: `translate3d(${slidePosition}%, 0px, 0px)` }}
        >
          {sectionMovies}
        </div>
        <div
          className="section-Arrow section-ArrowRight"
          onClick={(e) => slide(e)}
        >
          <Arrow />
        </div>
        <div
          className="section-Arrow section-ArrowLeft"
          onClick={(e) => slide(e)}
          style={{ display: hasSlided ? "flex" : "none" }}
        >
          <Arrow />
        </div>
      </div>
    </div>
  );
}
