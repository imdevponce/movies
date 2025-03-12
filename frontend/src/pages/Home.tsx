import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import FilterBy from "../components/FilterBy";
import CardMovie from "../components/CardMovie";
import { useNavigate } from "react-router-dom";
import { API_URL, encryptData, decryptData } from "../utils";
interface Movie {
  tconst: string;
  title: string;
  original_title: string;
  year: string;
  runtime: string;
  genre: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [itemsToShow, setItemsToShow] = useState<number>(20);
  const navigate = useNavigate();

  useEffect(() => {
    const cachedMovies = sessionStorage.getItem("movies");
    if (cachedMovies) {
      const decryptedMovies = decryptData(cachedMovies);
      setMovies(decryptedMovies.slice(0, itemsToShow));
      setAllMovies(decryptedMovies);
      setLoading(false);
    } else {
      axios
        .get(API_URL + "/api/movies/")
        .then((response) => {
          const fetchedMovies = response.data;
          setMovies(fetchedMovies.slice(0, itemsToShow));
          setAllMovies(fetchedMovies);
          const encryptedMovies = encryptData(fetchedMovies);
          sessionStorage.setItem("movies", encryptedMovies);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [itemsToShow]);

  const sortMovies = (movies: Movie[], criterion: string) => {
    const sortedMovies = [...movies];
    return sortedMovies.sort((a, b) => {
      const getValue = (value: string | null | undefined) => value || "";
      switch (criterion) {
        case "genre":
          const genreA = getValue(a.genre);
          const genreB = getValue(b.genre);
          if (genreA === "" && genreB === "") return 0;
          return genreA === ""
            ? 1
            : genreB === ""
            ? -1
            : genreA.localeCompare(genreB);
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        case "year":
          const yearA = a.year ? Number(a.year) : Infinity;
          const yearB = b.year ? Number(b.year) : Infinity;
          return yearA - yearB;
        default:
          return 0;
      }
    });
  };

  const onHandleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "year":
        setMovies(sortMovies(movies, "year"));
        setAllMovies(sortMovies(allMovies, "year"));
        break;
      case "title":
        setMovies(sortMovies(movies, "title"));
        setAllMovies(sortMovies(allMovies, "title"));
        break;
      case "genre":
        setMovies(sortMovies(movies, "genre"));
        setAllMovies(sortMovies(allMovies, "genre"));
        break;
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom && !loading && movies.length < allMovies.length) {
      loadMoreItems();
    }
  };

  const loadMoreItems = () => {
    setLoadingData(true);
    setTimeout(() => {
      setLoadingData(false);
      setItemsToShow((prev) => prev + 20);
    }, 1000);
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-6">
      <h1
        className="text-3xl font-bold mb-6 text-center"
        id="page-title"
        tabIndex={0}
      >
        🎬 Movie Explorer
      </h1>

      <FilterBy
        options={["year", "title", "genre"]}
        onHandleChange={onHandleChangeFilter}
      />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto h-[500px]"
        onScroll={handleScroll}
      >
        <div className="mb-6" aria-labelledby="movie-section">
          <h2
            className="text-xl font-semibold mb-4"
            id="movie-section"
            tabIndex={0}
          >
            Movies
          </h2>
          <div className="grid gap-6">
            {movies.map((movie) => (
              <CardMovie
                key={movie.tconst}
                movie={movie}
                onHandleClick={() =>
                  navigate(`/movies/${movie.title}/principals/${movie.tconst}`)
                }
              />
            ))}
          </div>
        </div>
      </div>
      {loadingData ? (
        <p className="text-center mt-4" aria-live="polite" aria-atomic="true">
          Loading...
        </p>
      ) : null}
    </div>
  );
};

export default Home;
