import { useState } from 'react'
import Joi from 'joi-browser'
import Input from '../Partials/Input'
import Select from '../Partials/Select'
import Button from '../Button/Button'
const UseForm = (Schema, formdata, setFormData, doSubmit) => {
  const [errors, setErrors] = useState({})

  // Custom validation method
  const validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(formdata, Schema, options)
    if (!error) return null
    const errors = {}
    for (let item of error.details) {
      errors[item.path[0]] = item.message
    }
    return errors
  }

  //Validate On Input Change
  const validateInput = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: Schema[name] }
    const { error } = Joi.validate(obj, schema)
    return error ? error.details[0].message : null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const all_errors = validate()
    setErrors(all_errors || {})
    if (all_errors) return
    doSubmit()
    //call to server
  }

  //On input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target
    const errorMessage = validateInput({ name, value })
    if (errorMessage) {
      errors[name] = errorMessage
    } else {
      delete errors[name]
    }
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }))
    setErrors(errors)
  }

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={formdata[name]}
        label={label}
        options={options}
        onChange={handleInputChange}
        error={errors[name]}
      />
    )
  }
  //Render Input Fields
  const renderInput = (name, label, type = 'text') => {
    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={formdata[name]}
        onChange={handleInputChange}
        error={errors[name]}
      />
    )
  }
  //Render Button
  const renderButton = (btntxt) => {
    return (
      <Button disabled={validate()} bgcolor="btn--secondary" btntext={btntxt} />
    )
  }
  return [renderInput, renderButton, handleSubmit, renderSelect]
}

export default UseForm
