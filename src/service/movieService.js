import http from './httpService'

const apiEndpoint = '/movies'
const movieUrl = (id) => {
  return `${apiEndpoint}/${id}`
}

export const GetMovies = () => {
  return http.get(apiEndpoint)
}
export const GetMovie = (movieId) => {
  return http.get(movieUrl(movieId))
}

export const SaveMovie = (movie) => {
  if (movie._id) {
    const body = { ...movie }
    delete body._id
    return http.put(movieUrl(movie._id), body)
  }
  return http.post(apiEndpoint, movie)
}

export const DeleteMovie = (movieId) => {
  return http.delete(movieUrl(movieId))
}
