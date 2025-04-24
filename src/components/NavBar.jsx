
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" data-testid="home-link">Home</NavLink>
      <NavLink to="/directors" data-testid="directors-link">Directors</NavLink>
      <NavLink to="/actors" data-testid="actors-link">Actors</NavLink>
    </nav>
  );
}

export default NavBar;