import React, { useRef, useState } from "react";
import { lang } from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "@/utils/openai.jsx";
import { API_OPTIONS } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "@/utils/gptSlice.jsx"; 

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  //movie search in tmdb api

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    if (!searchText.current.value.trim()) return;
    if (loading) return; // 🔥 prevents multiple calls

    setLoading(true);

    try {
      const gptQuery = `
Act as a movie recommendation assistant.
Suggest exactly 5 movies for the query: "${searchText.current.value}".
Return ONLY movie names, comma separated.
`;

      const gptResults = await openai.responses.create({
        model: "gpt-4o-mini",
        input: gptQuery,
      });

      const movieText = gptResults.output_text;

      if (!movieText) {
        throw new Error("No GPT output received");
      }

      const gptMovies = movieText
        .split(",")
        .map((movie) => movie.trim());


      // for each movie,  i will search tmdb api

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);
      console.log("tmdbResults:", tmdbResults);


dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults:tmdbResults }));

      const result =
        gptResults.output[0].content[0].text;

      console.log("GPT Result:", result);
    } catch (err) {
      console.error("GPT Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-white col-span-9"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />

        <button
          type="button"
          className={`col-span-3 m-4 py-2 px-4 rounded-lg text-white 
            ${loading ? "bg-gray-500" : "bg-red-700"}`}
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? "Searching..." : lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
