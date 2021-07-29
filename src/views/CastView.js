import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MovieDbApi from '../services/MovieDbApi';

export default function CastView() {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState(null);

  useEffect(() => {
    MovieDbApi.getMovieCredits(movieId).then(setMovieCast);
  }, [movieId]);

  return (
    <>
      <ul>
        {movieCast && movieCast.cast.length === 0 && (
          <li> there is not information </li>
        )}
        {movieCast &&
          movieCast.cast.map(cast => (
            <li key={cast.id}>
              <div>{cast.name}</div>
              <div>Character: {cast.character}</div>
              {!cast.profile_path && (
                <img
                  src="https://place-hold.it/200x200?text=should be something%20Here"
                  alt={cast.name}
                ></img>
              )}

              {cast.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                  alt={cast.name}
                ></img>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
