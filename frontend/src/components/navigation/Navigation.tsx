import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/mainApi";
import { unauthenticateUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { clearLocalStorageUserData } from "../../utils/localStorageUserData";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const logoutHandler = () => {
    // clear tokens from cookies
    logout();

    // clear user data from local storage
    clearLocalStorageUserData();

    // clear user data from redux store
    dispatch(unauthenticateUser());

    navigate("/");
  };

  return (
    <nav>
      <ul style={{ display: "flex", gap: "5rem" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {currentUser ? (
          <li onClick={logoutHandler}>Logout</li>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/protected">Protected</Link>
        </li>
        <li>
          <Link to="/unprotected">Unprotected</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
