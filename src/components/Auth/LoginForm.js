import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from '../../service/authService'
import Joi from 'joi-browser'
import useCustomForm from '../common/useCustomForm'

const LoginForm = ({ location }) => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  //Joi-browser schema validation
  const Schema = {
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().label('Password').required(),
  }

  const doSubmit = async () => {
    //call to server
    try {
      await auth.Login(data.email, data.password)
      const { state } = location
      window.location = state ? state.from.pathname : '/'
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const getErr = { ...errors }
        getErr.email = ex.response.data
        setErrors(getErr)
      }
    }
  }

  const [renderInput, renderButton, handleSubmit] = useCustomForm(
    Schema,
    data,
    setData,
    doSubmit,
  )
  if (auth.GetCurrentUser()) return <Redirect to="/" />
  return (
    <div className="form--wrapper">
      <form
        className="card form-card  mb-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h3>Login</h3>
        <hr />
        {renderInput('email', 'Email')}
        {renderInput('password', 'Password', 'password')}
        {renderButton('LOGIN')}
      </form>
    </div>
  )
}

export default LoginForm
