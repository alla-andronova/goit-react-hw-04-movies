import { NavLink } from 'react-router-dom';
import s from './navigation.module.css';

const Navigaion = () => (
  <nav>
    <NavLink exact to="/" className={s.link} activeClassName={s.active}>
      Home
    </NavLink>
    <NavLink to="/movies" className={s.link} activeClassName={s.active}>
      Movies
    </NavLink>
  </nav>
);

export default Navigaion;
