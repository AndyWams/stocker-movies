import React, { useState } from "react";
import Button from "../Button/Button";
import Input from "../Partials/Input";
import Joi from "joi-browser";
const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  //Joi-browser schema validation
  const schema = {
    email: Joi.string().required().label("Email").email(),
    username: Joi.string().min(3).required().label("Username"),
    password: Joi.string().required().min(3).label("Password"),
  };

  // Custom validation method
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;
    const errors = {};
    console.log(errors);

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
        <h3>Register</h3>
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
          label="Username"
          name="username"
          value={data.username}
          onChange={(event) =>
            setData({
              ...data,
              username: event.target.value,
            })
          }
          error={errors.username}
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
        <Button bgcolor="btn--secondary" btntext="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
