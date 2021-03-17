import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Movies from "./components/Movies/Movies";
import FilterList from "./components/FilterList/FilterList";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });

  //Lifecycle method
  useEffect(() => {
    const getMovies = async () => {
      const moviesFromServer = await fetchMovies();
      setMovies(moviesFromServer);
    };
    const getGenres = async () => {
      const genresFromServer = await fetchGenres();
      const allGenres = [{ name: "All Genres" }, ...genresFromServer];
      setGenres(allGenres);
    };
    getMovies();
    getGenres();
  }, []);

  //Get tasks
  const fetchMovies = async () => {
    const res = await fetch("http://localhost:5000/movies");
    const data = await res.json();
    return data;
  };

  //Get genres
  const fetchGenres = async () => {
    const res = await fetch("http://localhost:5000/genres");
    const data = await res.json();
    return data;
  };

  //Get task
  const getMovie = async (id) => {
    const res = await fetch(`http://localhost:5000/movies/${id}`);
    const data = await res.json();
    return data;
  };

  //Add Task
  const addMovie = async (movie) => {
    const res = await fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    const data = await res.json();
    setMovies([...movies, data]);
  };

  //Delete Task
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/movies/${id}`, {
      method: "DELETE",
    });
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  //Toggle Liked
  const handleToggleLiked = async (id) => {
    const movieToToggle = await getMovie(id);
    let updateMovie = { ...movieToToggle, liked: !movieToToggle.liked };

    const res = await fetch(`http://localhost:5000/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateMovie),
    });

    const data = await res.json();

    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, liked: data.liked } : movie
      )
    );
  };

  //Handle Page Change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Handle Genre Selection
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  //Handle Sort
  const handleSort = (path) => {
    setSortColumn({ path, order: "asc" });
  };

  return (
    <Router>
      <main className="main">
        <Header />
        <div className="container">
          <Route
            path="/"
            exact
            render={() => (
              <>
                <div className={`main__wrapper`}>
                  <FilterList
                    items={genres}
                    selectedItem={selectedGenre}
                    onItemSelect={handleGenreSelect}
                  />
                  <div>
                    <Movies
                      movies={movies}
                      onDelete={handleDelete}
                      onToggleLiked={handleToggleLiked}
                      OnHandlePageChange={handlePageChange}
                      selectedGenre={selectedGenre}
                      currentPage={currentPage}
                      onSort={handleSort}
                      sortColumn={sortColumn}
                    />
                  </div>
                </div>
              </>
            )}
          />
          <Route
            path="/create-movie"
            render={() => <CreateMovie addMovie={addMovie} />}
          />
        </div>
      </main>
    </Router>
  );
}

export default App;
