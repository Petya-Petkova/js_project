import { useState } from "react";

const sort_by = (field, reverse, primer) => {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};

function removeItemOnce(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const Movies = ({ movies, setMovies }) => {
  const [view, setView] = useState(false);
  const [order, setOrder] = useState();

  const onClickHandler = (e) => {
    setMovies((curr) => {
      let newArr = removeItemOnce([...curr], e.target.id);

      return newArr;
    });
  };

  const onOrderChangeHandler = (e) => {
    setOrder(e.target.value);
    if (e.target.value === "imdbRating" || e.target.value === "BoxOffice") {
      setMovies((curr) => {
        const newArr = [...curr].sort(sort_by(e.target.value, true, parseInt));
        return newArr;
      });

      return;
    }

    setMovies((curr) => {
      const newArr = [...curr].sort(
        sort_by(e.target.value, false, (a) => a.toUpperCase())
      );
      return newArr;
    });
  };

  const onClickChangeViewHandler = () => {
    setView((curr) => !curr);
  };

  return (
    <div className="movies-container">
      <div className="found-container">
        <h3> Movies found: </h3>
        <select
          className="order-style"
          id="order-style"
          value={order}
          onChange={onOrderChangeHandler}
        >
          <option value="Title">Title</option>
          <option value="Actors">Actors</option>
          <option value="Country">Country</option>
          <option value="imdbRating">Imdb Rating</option>
        </select>

        <img onClick={onClickChangeViewHandler} src="changeview.png" alt="" />
      </div>

      {movies.map((movie, index) => {
        return (
          <div
            id={index}
            key={index}
            className={
              view
                ? `movie-entity-container movie-entity-1`
                : `movie-entity-container movie-entity-2`
            }
          >
            <span id={index} onClick={onClickHandler} className="movie-delete">
              Delete
            </span>
            <img
              src={
                movie.Poster === "N/A" ? "image_not_found.png" : movie.Poster
              }
              alt=""
            />
            <div>
              <div>
                <span> Title:</span> {movie.Title}
              </div>
              <div>
                <span> Actors: </span>
                {movie.Actors}
              </div>
              <div>
                <span> BoxOffice:</span> {movie.BoxOffice}
              </div>
              <div>
                <span> Country: </span>
                {movie.Country}
              </div>
              <div>
                <span> Production: </span>
                {movie.Production ? movie.Production : "N/A"}
              </div>
              <div>
                <span> Imdb Rating: </span>
                {movie.imdbRating}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
