import React, { useState } from "react";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MovieProvider } from "./context/MovieContext";
import Movies from "./components/Movies/Movies";
import FilterList from "./components/FilterList/FilterList";
import NotFound from "./components/NotFound/NotFound";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import MovieForm from "./components/MovieForm/MovieForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <main className="main">
          <MovieProvider>
            <Header />
            <div className="container">
              <Switch>
                <Route
                  path="/"
                  exact
                  render={(props) => (
                    <>
                      <div className={`main__wrapper`}>
                        <FilterList
                          onHandleGenreSelect={handleGenreSelect}
                          selectedGenre={selectedGenre}
                          {...props}
                        />
                        <div>
                          <Movies
                            selectedGenre={selectedGenre}
                            setSelectedGenre={selectedGenre}
                          />
                        </div>
                      </div>
                    </>
                  )}
                />
                <Route path="/login" render={() => <LoginForm />} />
                <Route path="/register" render={() => <RegisterForm />} />
                <Route
                  path="/movies/:id"
                  render={(props) => <MovieForm {...props} />}
                />
                <Route
                  path="/create-movie/:id"
                  render={(props) => <MovieForm {...props} />}
                />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
                <Redirect from="/" to="/" exact />
              </Switch>
            </div>
          </MovieProvider>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
