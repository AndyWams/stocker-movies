import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Stocker Movies
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
