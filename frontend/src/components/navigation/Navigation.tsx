import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "5rem" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/test">Am I Authenticated?</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
