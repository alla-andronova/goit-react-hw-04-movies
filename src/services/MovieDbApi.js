class MovieDbApi {
  async fetchWithErrorHandling(url = '', config = {}) {
    const response = await fetch(url, config);
    return response.ok
      ? await response.json()
      : Promise.reject(new Error('Not found'));
  }

  getTrending() {
    return this.fetchWithErrorHandling(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=2bf11d6992fd98fca8f8d80bf42431a8`,
    );
  }

  searchMovies(query) {
    return this.fetchWithErrorHandling(`
https://api.themoviedb.org/3/search/movie?api_key=2bf11d6992fd98fca8f8d80bf42431a8&language=en-US&query=${query}&page=1&include_adult=false`);
  }

  getMovieDetails(movieId) {
    return this.fetchWithErrorHandling(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=2bf11d6992fd98fca8f8d80bf42431a8&language=en-US`,
    );
  }

  getMovieCredits(movieId) {
    return this.fetchWithErrorHandling(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2bf11d6992fd98fca8f8d80bf42431a8&language=en-US`,
    );
  }

  getMovieReviews(movieId) {
    return this.fetchWithErrorHandling(
      `
https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=2bf11d6992fd98fca8f8d80bf42431a8&language=en-US&page=1`,
    );
  }
}
export default new MovieDbApi();
