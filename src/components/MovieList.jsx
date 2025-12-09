import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {

  // If movies is null, undefined, or empty → do not crash
  if (!movies || movies.length === 0) {
    return (
      <div className="px-4">
        <h1 className="text-white text-2xl">{title}</h1>
        <p className="text-gray-400 text-sm">No movies available.</p>
      </div>
    );
  }
  return (
    <div className="px-6 ">
    <h1 className='text-3xl py-12 text-white'>{title}</h1>
    <div className=" flex overflow-x-auto scrollbar-hide">
     <div className='flex'>
        {movies?.map((movie => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ) ))}
    </div></div>
    </div>
  );
};
export default MovieList
