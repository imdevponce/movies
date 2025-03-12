interface Props {
  movie: {
    tconst: string;
    title: string;
    original_title: string;
    year: string;
    runtime: string;
    genre: string;
  };
  onHandleClick: () => void;
}

const CardMovie = ({ movie, onHandleClick }: Props) => {
  return (
    <div
      key={movie.tconst}
      className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={onHandleClick}
      tabIndex={0}
      role="button"
      aria-label={`Go to details of ${movie.title || "Unknown Movie"}`}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-600">
          {movie.title || "Unknown Movie"}
        </h3>
        <p className="text-sm text-gray-600">
          {movie.year || "Unknown Year"} - {movie.genre || "Unknown Genre"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Runtime: {movie.runtime || "Unknown Runtime"} min
        </p>
      </div>
    </div>
  );
};

export default CardMovie;
