import { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import MovieDbApi from '../services/MovieDbApi';
import CastView from './CastView';
import ReviewView from './ReviewView';

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    MovieDbApi.getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          {!movie.backdrop_path && (
            <img
              src="https://place-hold.it/200x200?text=should be something%20Here"
              alt={movie.title}
            ></img>
          )}
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.title}
            ></img>
          )}
          <button
            style={{ display: 'block' }}
            type="button"
            onClick={e => {
              history.push(location?.state?.from ?? '/');
            }}
          >
            Go Back
          </button>
          <h1>{movie.title}</h1>
          <span>
            User Score: {Math.floor((movie.vote_average / 10) * 100) + '%'}
          </span>
          <p>Overview: {movie.overview}</p>
          <p>
            Genres: <br />
            {movie.genres.map(genre => (
              <span key={movie.id}>{genre.name}, </span>
            ))}
          </p>
          <NavLink to={`${url}/${movieId}/cast`}> cast </NavLink> <br />
          <NavLink to={`${url}/${movieId}/review`}> review </NavLink>
        </>
      )}
      <Route path={`${path}/:movieId/cast`} exact>
        <CastView />
      </Route>
      <Route path={`${path}/:movieId/review`}>
        <ReviewView />
      </Route>
    </>
  );
}
