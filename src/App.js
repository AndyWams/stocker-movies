import { useState } from "react";
import Header from "./components/Header/Header";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Movies from "./components/Movies/Movies";
import FilterList from "./components/FilterList/FilterList";
import { MovieProvider } from "./context/MovieContext";
import "./App.scss";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };
  return (
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
                        <Movies selectedGenre={selectedGenre} />
                      </div>
                    </div>
                  </>
                )}
              />
              <Route path="/create-movie" render={() => <CreateMovie />} />
              <Route path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </MovieProvider>
      </main>
    </Router>
  );
}

export default App;
