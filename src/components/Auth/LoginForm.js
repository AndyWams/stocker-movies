import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import auth from "../../service/authService";
import Button from "../Button/Button";
import Input from "../Partials/Input";
import Joi from "joi-browser";

const LoginForm = ({ location }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  //Joi-browser schema validation
  const Schema = {
    email: Joi.string().email().label("Email").required(),
    password: Joi.string().label("Password").required(),
  };

  // Custom validation method
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, Schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  //Validate On Input Change
  const validateInput = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: Schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all_errors = validate();
    setErrors(all_errors || {});
    if (all_errors) return;
    doSubmit();
  };

  const doSubmit = async () => {
    //call to server
    try {
      await auth.Login(data.email, data.password);
      const { state } = location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const getErr = { ...errors };
        getErr.email = ex.response.data;
        setErrors(getErr);
      }
    }
  };

  //On input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const errorMessage = validateInput({ name, value });
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }
    setData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
    setErrors(errors);
  };
  //Render Input Fields
  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={data[name]}
        onChange={handleInputChange}
        error={errors[name]}
      />
    );
  };
  //Render Button
  const renderButton = () => {
    return (
      <Button disabled={validate()} bgcolor="btn--secondary" btntext="Login" />
    );
  };

  if (auth.GetCurrentUser()) return <Redirect to="/" />;
  return (
    <div className="form--wrapper">
      <form
        className="card form-card  mb-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h3>Login</h3>
        <hr />
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderButton()}
      </form>
    </div>
  );
};

export default LoginForm;
