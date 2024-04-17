import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/mainApi";
import { authenticateUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { setLocalStorageUserData } from "../../utils/localStorageUserData";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { data, isLoading, error }] = useLoginMutation();
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

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userData = await login(formState).unwrap();
    dispatch(authenticateUser(userData));
    setLocalStorageUserData(userData);
    navigate("/");
  };

  return (
    <React.Fragment>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </React.Fragment>
  );
}

export default Login;
