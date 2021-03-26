import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MovieContext } from '../../context/MovieContext'
import auth from '../../service/authService'
import {
  GetMovies,
  DeleteMovie,
  GetMovie,
  UpdateLike,
} from '../../service/movieService'
import { toast } from 'react-toastify'
import Pagination from '../Pagination/Pagination'
import Paginate from '../Utils/Paginate'
import MovieTable from '../Partials/MovieTable'
import Searchbox from '../Searchbox/Searchbox'
import _ from 'lodash'

const Movies = ({
  selectedGenre,
  currentPage,
  setCurrentPage,
  onHandleSearch,
  searchQuery,
}) => {
  const [pageSize] = useState(5)
  const [movies, setMovies] = useContext(MovieContext)
  const user = auth.GetCurrentUser()

  const [sortColumn, setSortColumn] = useState({
    path: '_id',
    order: 'asc',
  })

  //Lifecycle method
  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesFromServer = await fetchMovies()
        setMovies(moviesFromServer)
      } catch (ex) {}
    }
    getMovies()
  }, [setMovies])

  //Get Movies
  const fetchMovies = async () => {
    const { data } = await GetMovies()
    return data
  }

  //Get Movie
  const fetchMovie = async (id) => {
    const { data } = await GetMovie(id)
    return data
  }

  //Toggle Liked
  const handleToggleLiked = async (id) => {
    const movieToToggle = await fetchMovie(id)
    const like = false
    let updateMovie = { ...movieToToggle, liked: !like }
    setMovies(
      movies.map((movie) =>
        movie._id === id ? { ...movie, liked: updateMovie.liked } : movie,
      ),
    )
    try {
      await UpdateLike(updateMovie)
    } catch (ex) {}
  }

  //Handle Sort
  const handleSort = (sortcolumn) => {
    setSortColumn(sortcolumn)
  }

  //Handle Page Change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  //Delete Movie
  const handleDelete = async (id) => {
    setMovies(movies.filter((movie) => movie._id !== id))
    setCurrentPage(1)
    try {
      await DeleteMovie(id)
      toast.success('Movie successfully deleted')
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted')
        setMovies(movies)
      }
    }
  }

  //Filter/Sort/Paginate
  const getPageData = () => {
    let filtered = movies
    if (searchQuery) {
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
      )
    } else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter(
        (movie) => movie.genre.name === selectedGenre.name,
      )
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const allmovies = Paginate(sorted, currentPage, pageSize)
    return {
      totalCount: filtered.length,
      data: allmovies,
    }
  }

  const { totalCount, data } = getPageData()
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between mb-4">
        <h3>All Movies</h3>
        {user && user.isAdmin && (
          <Link to="/movies/new" className="btn--link">
            Create Movies
          </Link>
        )}
      </div>
      <p>
        showing {totalCount} <strong>movies</strong> in the database
      </p>
      <Searchbox value={searchQuery} onChange={onHandleSearch} />
      <MovieTable
        onDelete={handleDelete}
        onToggleLike={handleToggleLiked}
        onHandleSort={handleSort}
        allmovies={data}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
      <Pagination
        itemCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  )
}

export default Movies
