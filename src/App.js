import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Navigaion from './components/Navigation/Navigation';
// import HomeView from './views/HomeView';
// import MoviesView from './views/MoviesView';
// import NotFoundView from './views/NotFoundView';
// import MovieDetailsView from './views/MovieDetailsView';

const HomeView = lazy(() => import('./views/HomeView.js'));
const MoviesView = lazy(() => import('./views/MoviesView.js'));
const NotFoundView = lazy(() => import('./views/NotFoundView.js'));
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView.js'));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Navigaion />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route exact path="/movies">
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
