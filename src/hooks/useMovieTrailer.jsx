import React, { use } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { API_OPTIONS } from '@/utils/constants'
import { addTrailerVideo } from '@/utils/moviesSlice'

const useMovieTrailer = () => {

    const dispatch = useDispatch();

   // fetch the trailer video from the movie database API & updating store with trailer video data 
  const getMovieVideos = async () => {
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/1084242/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);

    const filterData = json.results.filter(video => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0]
    console.log(trailer);
    // setTrailerId(trailer.key);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, [])
}

export default useMovieTrailer