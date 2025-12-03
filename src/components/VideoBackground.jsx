import { API_OPTIONS } from '@/utils/constants'
import React, { useState,useEffect } from 'react'

const VideoBackground = ({ movieId }) => {

  const [trailerId, setTrailerId] = useState(null);

  // fetch the trailer video from the movie database API
  const getMovieVideos = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/1084242/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);

    const filterData = json.results.filter(video => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0]
    console.log(trailer);
    setTrailerId(trailer.key);
  };

  useEffect(() => {
    getMovieVideos();
  }, [])
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/sEgPQ7HKoBA?si=CB_2FSeH5K8q0tFv" + trailerId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default VideoBackground


