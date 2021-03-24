import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GetGenres } from "../../service/genreService";
import { GetMovie, SaveMovie } from "../../service/movieService";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import Input from "../Partials/Input";
import Select from "../Partials/Select";
import Joi from "joi-browser";
import "./MovieForm.scss";

const MovieForm = ({ match }) => {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  //Joi-browser schema validation
  const Schema = {
    _id: Joi.string(),
    genreId: Joi.string().required().label("Genres"),
    title: Joi.string().label("Title").required(),
    numberInStock: Joi.number()
      .label("Number In Stock")
      .min(0)
      .max(100)
      .required(),
    dailyRentalRate: Joi.number()
      .label("Daily Rental Rate")
      .min(0)
      .max(10)
      .required(),
  };

  useEffect(() => {
    const getGenres = async () => {
      const genresFromServer = await fetchGenres();
      setGenres(genresFromServer);
    };
    getGenres();

    const movieId = match.params.id;
    if (movieId === "new") {
      return;
    }
    try {
      const getmovie = async () => {
        const { data: movie } = await GetMovie(movieId);
        setData(mapToViewModel(movie));
      };
      getmovie();
    } catch (ex) {
      console.log(ex);

      return ex;
    }
  }, [setGenres, setData, match.params.id]);

  //Get genres
  const fetchGenres = async () => {
    const { data } = await GetGenres();
    return data;
  };

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  // Custom validation method
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, Schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  //Validate On Input Change
  const validateInput = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: Schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all_errors = validate();
    setErrors(all_errors || {});
    if (all_errors) return;
    doSubmit();
    //call to server
  };

  const doSubmit = async () => {
    //call to server
    await SaveMovie(data);
    history.push("/");
    toast.info("🚀Awesome...! 🚀", {
      position: "top-center",
      options: {
        transition: "flip",
      },
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //On input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const errorMessage = validateInput({ name, value });
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }
    setData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
    setErrors(errors);
  };

  //Render Input Fields
  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={data[name]}
        onChange={handleInputChange}
        error={errors[name]}
      />
    );
  };
  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleInputChange}
        error={errors[name]}
      />
    );
  };
  //Render Button
  const renderButton = () => {
    return (
      <Button disabled={validate()} bgcolor="btn--secondary" btntext="SAVE" />
    );
  };

  return (
    <div className="container__wrap">
      <form
        className="card form-card  mb-4"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h3>Movie Form</h3>
        <hr />
        {renderInput("title", "Title")}
        {renderSelect("genreId", "Genre", genres)}
        {renderInput("numberInStock", "Number In Stock", "number")}
        {renderInput("dailyRentalRate", "Daily Rental", "number")}
        {renderButton()}
      </form>
    </div>
  );
};

export default MovieForm;
