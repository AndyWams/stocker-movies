import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container  d-flex navbar-light bg-light justify-content-between">
          <NavLink className="navbar-brand" to="/">
            Stocker Movies
          </NavLink>
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item active">
              <NavLink className="nav-link mr-4" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
