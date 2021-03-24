import http from "./httpService";
import { apiUrl } from "../config.json";

export const GetMovies = () => {
  return http.get(`${apiUrl}/movies`);
};
export const GetMovie = (movieId) => {
  return http.get(apiUrl + "/movies/" + movieId);
};

export const SaveMovie = (movie) => {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`${apiUrl}/movies/${movie._id}`, body);
  }
  return http.post(`${apiUrl}/movies`, movie);
};

export const DeleteMovie = (movieId) => {
  return http.delete(`${apiUrl}/movies/${movieId}`);
};

export const UpdateLike = (movieId, movie) => {
  return http.put(`${apiUrl}/movies/${movieId}`, { movie });
};
