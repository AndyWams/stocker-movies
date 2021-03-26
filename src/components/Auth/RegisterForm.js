import React, { useState } from 'react'
import * as userService from '../../service/userService'
import auth from '../../service/authService'
import Joi from 'joi-browser'
import useCustomForm from '../common/useCustomForm'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  //Joi-browser schema validation
  const Schema = {
    email: Joi.string().required().label('Email').email(),
    username: Joi.string().min(3).required().label('Username'),
    password: Joi.string().required().min(3).label('Password'),
  }
  const doSubmit = async () => {
    //call to server
    try {
      const response = await userService.Register(data)
      auth.LoginWithJwt(response.headers['x-auth-token'])
      window.location = '/'
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
  return (
    <div className="form--wrapper">
      <form
        className="card form-card  mb-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h3>Register</h3>
        <hr />
        {renderInput('email', 'Email')}
        {renderInput('username', 'Username')}
        {renderInput('password', 'Password', 'password')}
        {renderButton('REGISTER')}
      </form>
    </div>
  )
}

export default RegisterForm
