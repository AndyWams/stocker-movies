import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../Button/Button";
import "./CreateMovie.scss";
import { MovieContext } from "../../context/MovieContext";

const CreateMovie = () => {
  const [movies, setMovies] = useContext(MovieContext);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [liked, setLiked] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      console.log("please enter description");
      return;
    } else {
      addMovie({ title, genre, rating, stock, liked });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        history.replace("/");
      }, 2000);
      setTitle("");
      setGenre("");
      setRating("");
      setStock("");
      setLiked(false);
    }
  };

  //Add Movie
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

  return (
    <div className="container__wrap">
      <div className={`container   ${success ? "visible" : ""}`}>
        <p>Account created successfully</p>
      </div>
      <form
        className="card movie__form mb-4"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <h3>Create Movie</h3>
        <hr />
        <div className="input">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="input">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </div>
        <div className="input">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
          />
        </div>
        <div className="input">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />
        </div>
        <div style={{ display: "none" }}>
          <input
            type="checkbox"
            name="liked"
            className="ml-2"
            checked={liked}
            value={liked}
            onChange={(event) => setLiked(event.currentTarget.checked)}
          />
        </div>

        <Button bgcolor="btn--secondary" btntext="ADD MOVIE" />
      </form>
    </div>
  );
};

export default CreateMovie;
