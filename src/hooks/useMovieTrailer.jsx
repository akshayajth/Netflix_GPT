import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '@/utils/constants';
import { addTrailerVideo } from '@/utils/moviesSlice';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;  

    const getMovieVideos = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      const json = await data.json();
    

      if (!json.results?.length) return;

      const trailers = json.results.filter(
        (video) => video.type === "Trailer"
      );

      const trailer = trailers.length ? trailers[0] : json.results[0];
     

      dispatch(addTrailerVideo(trailer)); 
    };

    getMovieVideos();
  }, [movieId, dispatch]);
};

export default useMovieTrailer;
