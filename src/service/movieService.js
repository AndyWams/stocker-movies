import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = "http://localhost:3900/api/movies";
export const GetMovies = () => {
  return http.get(`${apiUrl}/movies`);
};

export const DeleteMovie = (movieId) => {
  return http.get(`${apiUrl}/movies/${movieId}`);
};
