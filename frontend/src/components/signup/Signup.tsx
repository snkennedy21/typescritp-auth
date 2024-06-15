import React, { useState } from "react";
import { useSignupMutation } from "../../store/mainApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../store/authSlice";

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
    <React.Fragment>
      <h1>Signup</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label>name</label>
          <input
            name="name"
            type="text"
            onChange={inputChangeHandler}
            value={formState.name}
          />
        </div>
        <div>
          <label>email</label>
          <input
            name="email"
            type="text"
            onChange={inputChangeHandler}
            value={formState.email}
          />
        </div>
        <div>
          <label>password</label>
          <input
            name="password"
            type="text"
            onChange={inputChangeHandler}
            value={formState.password}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </React.Fragment>
  );
}

export default Signup;
