import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MovieDbApi from '../services/MovieDbApi';

export default function CastView() {
  const { movieId } = useParams();

  const [movieReview, setMovieReview] = useState(null);

  useEffect(() => {
    MovieDbApi.getMovieReviews(movieId).then(setMovieReview);
  }, [movieId]);

  return (
    <>
      <ul>
        {movieReview && movieReview.results.length === 0 && (
          <li> there is not reviews </li>
        )}
        {movieReview &&
          movieReview.results.map(review => (
            <li key={review.id}>
              <div>{review.author}:</div>
              <div>{review.content}</div>
            </li>
          ))}
      </ul>
    </>
  );
}
