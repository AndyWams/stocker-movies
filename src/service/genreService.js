import http from "./httpService";
import { apiUrl } from "../config.json";
export const GetGenres = () => {
  return http.get(`${apiUrl}/genres`);
};
