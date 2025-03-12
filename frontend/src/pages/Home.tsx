import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import FilterBy from "../components/FilterBy";

interface Movie {
  tconst: string;
  title: string;
  original_title: string;
  year: string;
  runtime: string;
  genre: string;
}

interface Principal {
  id: number;
  category: string;
  characters: string[];
  tconst: string;
  nconst: string;
}

interface Name {
  nconst: string;
  name: string;
  birth_year: string;
  death_year: string | null;
  primary_professions: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [names, setNames] = useState<Name[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemsToShow, setItemsToShow] = useState<number>(20);

  useEffect(() => {
    if (itemsToShow === 20) {
      // Fetch movies
      axios.get("http://127.0.0.1:8000/api/movies/").then((response) => {
        setMovies(response.data.slice(0, itemsToShow));
        setAllMovies(response.data);
      });
      // Fetch names
      axios.get("http://127.0.0.1:8000/api/names/").then((response) => {
        setNames(response.data);
      });
    } else {
      console.log("updated");
      setMovies(allMovies.slice(0, itemsToShow));
    }
  }, [itemsToShow]);
  console.log("allMovies", allMovies);
  console.log("movies", movies);
  useEffect(() => {
    if (selectedMovie) {
      // Fetch principals for the selected movie
      axios.get("http://127.0.0.1:8000/api/principals/").then((response) => {
        const filteredPrincipals = response.data.filter(
          (principal: Principal) => principal.tconst === selectedMovie
        );
        setPrincipals(filteredPrincipals);
      });
    }
  }, [selectedMovie]);

  const getActorName = (nconst: string) => {
    const actor = names.find((name) => name.nconst === nconst);
    return actor ? actor.name : "Unknown Actor";
  };

  // Handle sorting
  function sortMovies(movies: Movie[], criterion: string): Movie[] {
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
  }

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setItemsToShow((prev) => prev + 20);
    }, 1000);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎬 Movie Explorer</h1>
      <FilterBy
        options={["year", "title", "genre"]}
        onHandleChange={onHandleChangeFilter}
      />
      <div
        className="grid grid-cols-2 gap-4"
        onScroll={handleScroll}
        style={{ overflowY: "auto", height: "500px" }}
      >
        {/* Movie List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Movies</h2>
          <ul className="list-disc pl-6">
            {movies.map((movie) => (
              <li
                key={movie.tconst}
                className="cursor-pointer text-blue-500"
                onClick={() => setSelectedMovie(movie.tconst)}
              >
                {movie.title} ({movie.year}) - {movie.genre}
              </li>
            ))}
          </ul>
        </div>

        {/* Principals and Actors */}
        {selectedMovie && (
          <div>
            <h2 className="text-lg font-semibold">
              Principals for{" "}
              {movies.find((m) => m.tconst === selectedMovie)?.title}
            </h2>
            <ul className="list-disc pl-6">
              {principals.map((principal) => (
                <li key={principal.id}>
                  <strong>{getActorName(principal.nconst)}</strong> -{" "}
                  {principal.category}
                  {principal.characters && (
                    <span> as {principal.characters.join(", ")}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {loading ? <div>Loading...</div> : null}
    </div>
  );
};

export default Home;
