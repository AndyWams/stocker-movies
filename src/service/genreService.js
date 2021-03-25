import http from './httpService'
export const GetGenres = () => {
  return http.get(`/genres`)
}
