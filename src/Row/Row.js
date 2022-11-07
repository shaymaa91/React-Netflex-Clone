import axios from "../axios";
import React, { useState } from "react";
import YouTube from "react-youtube";
import { useEffect } from "react";
import styles from "./Row.module.css";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  const [movies, setmovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // console.log(movies);

  const handleClick = (movie) => {
    setTrailerUrl("5VYb3B1ETlk&t");
    // if (trailerUrl) {
    //   setTrailerUrl("");
    // } else {
    //   movieTrailer(movie?.title || "")
    //     .then((url) => {
    //       const urlParams = new URLSearchParams(new URL(url).search);
    //       setTrailerUrl(urlParams.get("v"));
    //     })
    //     .catch((error) => console.log(error));
    // }
  };

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <div className={styles.Row}>
      {/* title */}
      <h2>{title}</h2>

      {/* container */}
      <div className={styles.row_poster}>
        {movies.map((data, idx) => {
          return (
            <img
              key={idx}
              onClick={() => handleClick(data)}
              className={`${styles.mapImages}  ${
                isLargeRow && styles.row_posterLarge
              }`}
              src={`${baseURL}${
                isLargeRow ? data.poster_path : data.backdrop_path
              }`}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={`xCwwxNbtK6Y`} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
