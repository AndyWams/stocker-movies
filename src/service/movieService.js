import http from "./httpService";
import { apiUrl } from "../config.json";

export const GetMovies = () => {
  return http.get(`${apiUrl}/movies`);
};
export const GetMovie = (movieId) => {
  return http.get(`${apiUrl}/movies/${movieId}`);
};

export const UpdateLike = (movieId, movie) => {
  return http.put(`${apiUrl}/movies/${movieId}`, { movie });
};

export const DeleteMovie = (movieId) => {
  return http.delete(`${apiUrl}/movies/${movieId}`);
};
