import { useState } from "react";
import Header from "./components/Header/Header";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Movies from "./components/Movies/Movies";
import FilterList from "./components/FilterList/FilterList";
import { MovieProvider } from "./context/MovieContext";
import "./App.scss";

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
            <Route
              path="/"
              exact
              render={() => (
                <>
                  <div className={`main__wrapper`}>
                    <FilterList
                      onHandleGenreSelect={handleGenreSelect}
                      selectedGenre={selectedGenre}
                    />
                    <div>
                      <Movies selectedGenre={selectedGenre} />
                    </div>
                  </div>
                </>
              )}
            />
            <Route path="/create-movie" render={() => <CreateMovie />} />
          </div>
        </MovieProvider>
      </main>
    </Router>
  );
}

export default App;
