import React, { useState } from "react";
import Button from "../Button/Button";
import Input from "../Partials/Input";
import Joi from "joi-browser";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  //Joi-browser schema validation
  const schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  // Custom validation method
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all_errors = validate();
    setErrors(all_errors || {});
    if (all_errors) return;
  };

  return (
    <div className="form--wrapper">
      <form
        className="card form-card  mb-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h3>Login</h3>
        <hr />
        <Input
          label="Email"
          name="email"
          value={data.email}
          onChange={(event) =>
            setData({
              ...data,
              email: event.target.value,
            })
          }
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          value={data.password}
          onChange={(event) =>
            setData({
              ...data,
              password: event.target.value,
            })
          }
          error={errors.password}
        />
        <Button
          //   disabled={validate()}
          bgcolor="btn--secondary"
          btntext="Login"
        />
      </form>
    </div>
  );
};

export default LoginForm;
