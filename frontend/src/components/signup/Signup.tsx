import React, { useState } from "react";
import { useSignupMutation } from "../../store/mainApi";

function Signup() {
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
    signup(formState);
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
