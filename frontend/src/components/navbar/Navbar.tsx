import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/learning">Learning</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
