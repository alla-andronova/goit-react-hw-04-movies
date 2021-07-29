import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import MovieDbApi from '../services/MovieDbApi';

export default function MoviesView() {
  const history = useHistory();
  const location = useLocation();

  const [inputValue, setInputValue] = useState(null);
  const [movies, setMovies] = useState(null);

  useEffect(
    () => {
      if (!inputValue) {
        // setMovies(null);
        return;
      }
      history.push({ ...location, search: `query=${inputValue}` });
      MovieDbApi.searchMovies(inputValue).then(setMovies);
    },
    // eslint-disable-next-line
    [inputValue],
  );

  useEffect(() => {
    if (movies !== null && movies.total_results === 0) {
      Toastify({
        text: 'This is no such movie',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        // backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        stopOnFocus: true, // Prevents dismissing of toast on hover
      }).showToast();
    }
  }, [movies]);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();

          setInputValue(e.target.elements.inputValue.value);
        }}
      >
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          name="inputValue"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
      </form>

      {movies &&
        movies.results.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
    </>
  );
}
