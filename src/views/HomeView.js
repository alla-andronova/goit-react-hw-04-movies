import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieDbApi from '../services/MovieDbApi';

export default function HomeView() {
  const [trendMovies, setTrendMovies] = useState(null);

  useEffect(() => {
    MovieDbApi.getTrending().then(setTrendMovies);
  }, []);

  return (
    <>
      <p>Todays trending films: </p>
      {trendMovies &&
        trendMovies.results.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}> {movie.title}</Link>
          </li>
        ))}
    </>
  );
}
