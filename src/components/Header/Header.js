import { NavLink } from 'react-router-dom'
import auth from '../../service/authService'

const Navbar = () => {
  const user = auth.GetCurrentUser()
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container  d-flex navbar-light bg-light justify-content-between">
          <div className="d-flex justify-content-between">
            <NavLink className="navbar-brand mr-5" to="/">
              Stocker Movies
            </NavLink>
            <div className="d-flex navbar-nav justify-content-between align-items-center">
              <NavLink className="nav-item nav-link" to="/rentals">
                Rentals
              </NavLink>
            </div>
          </div>
          {!user && (
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item">
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
          )}
          {user && (
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item">
                <NavLink className="nav-link mr-4" to="/profile">
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
