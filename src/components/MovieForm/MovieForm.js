import { useState, useEffect } from 'react'
import { GetGenres } from '../../service/genreService'
import { GetMovie, SaveMovie } from '../../service/movieService'
import { toast } from 'react-toastify'
import useCustomForm from '../common/useCustomForm'
import Joi from 'joi-browser'
import './MovieForm.scss'

const MovieForm = ({ match, history }) => {
  const [data, setData] = useState({
    title: '',
    genreId: '',
    numberInStock: '',
    dailyRentalRate: '',
  })
  const [genres, setGenres] = useState([])

  //Joi-browser schema validation
  const Schema = {
    _id: Joi.string(),
    genreId: Joi.string().required().label('Genres'),
    title: Joi.string().label('Title').required(),
    numberInStock: Joi.number()
      .label('Number In Stock')
      .min(0)
      .max(100)
      .required(),
    dailyRentalRate: Joi.number()
      .label('Daily Rental Rate')
      .min(0)
      .max(10)
      .required(),
  }

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }
  useEffect(() => {
    const getItem = async () => {
      try {
        const { data } = await GetGenres()
        setGenres(data)
        const paramsId = match.params.id
        if (paramsId === 'new') return
        const { data: movie } = await GetMovie(paramsId)
        setData(mapToViewModel(movie))
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          history.replace('/404')
        }
      }
    }
    getItem()
    return () => {}
  }, [history, match.params.id])

  const doSubmit = async () => {
    //call to server
    try {
      await await SaveMovie(data)
      history.push('/')
      toast.info('🚀Awesome...! 🚀', {
        position: 'top-center',
        options: {
          transition: 'flip',
        },
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (ex) {}
  }

  const [renderInput, renderButton, handleSubmit, renderSelect] = useCustomForm(
    Schema,
    data,
    setData,
    doSubmit,
  )
  return (
    <div className="container__wrap">
      <form
        className="card form-card  mb-4"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h3>Movie Form</h3>
        <hr />
        {renderInput('title', 'Title')}
        {renderSelect('genreId', 'Genre', genres)}
        {renderInput('numberInStock', 'Number In Stock', 'number')}
        {renderInput('dailyRentalRate', 'Daily Rental', 'number')}
        {renderButton('SAVE')}
      </form>
    </div>
  )
}

export default MovieForm
