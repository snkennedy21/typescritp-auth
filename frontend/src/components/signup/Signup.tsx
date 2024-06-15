import React, { useState } from "react";
import { useSignupMutation } from "../../store/mainApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../store/authSlice";
import FormInput from "../formInput/FormInput";
import Button from "../button/Button";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formState)
      .then((response) => {
        console.log("RESPONSE: ", response);
        const userData = response.data;
        dispatch(authenticateUser(userData));
        navigate("/");
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className="m-2">
      <h1 className="font-bold mb-4">Signup Page</h1>
      <form onSubmit={submitFormHandler}>
        <FormInput
          label="name"
          name="name"
          type="text"
          onChange={inputChangeHandler}
          value={formState.name}
        />
        <FormInput
          label="email"
          name="email"
          type="text"
          onChange={inputChangeHandler}
          value={formState.email}
        />
        <FormInput
          label="password"
          name="password"
          type="password"
          onChange={inputChangeHandler}
          value={formState.password}
        />
        <Button type="submit" variant="primary">
          Signup
        </Button>
      </form>
    </div>
  );
}

export default Signup;
