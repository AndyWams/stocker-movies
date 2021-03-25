import Button from '../Button/Button'
import Favorite from '../Favorite/Favorite'
import auth from '../../service/authService'
import Table from './Table'
import { Link } from 'react-router-dom'

const MovieTable = ({
  onDelete,
  onToggleLike,
  onSort,
  sortColumn,
  allmovies,
}) => {
  const user = auth.GetCurrentUser()
  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) =>
        user && user.isAdmin ? (
          <Link to={`/movies/${movie._id}`}> {movie.title}</Link>
        ) : (
          movie.title
        ),
    },
    {
      path: 'genre.name',
      label: 'Genre',
    },
    {
      path: 'numberInStock',
      label: 'Stock',
    },
    {
      path: 'dailyRentalRate',
      label: 'Rating',
    },
  ]
  const updateColumn = () => {
    if (user && user.isAdmin) {
      columns.push(
        {
          key: 'like',
          label: 'Like',
          content: (movie) => (
            <Favorite movie={movie} onToggle={onToggleLike} />
          ),
        },
        {
          key: 'delete',
          label: 'Action',
          content: (movie) => (
            <Button
              bgcolor="btn--danger btn-md"
              btntext="Delete"
              onClick={() => onDelete(movie._id)}
            />
          ),
        },
      )
    }
  }
  updateColumn()
  return (
    <Table
      data={allmovies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  )
}

export default MovieTable
