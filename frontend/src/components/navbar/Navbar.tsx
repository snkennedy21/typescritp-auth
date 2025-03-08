import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="bg-gradient-to-r from-[#0eabd2] to-[#6249e3] p-4 fixed top-0 w-full z-10">
			<ul className="flex space-x-4">
				<li>
					<Link to="/" className="text-white">
						Home
					</Link>
				</li>
				<li>
					<Link to="/learning" className="text-white">
						Learning
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
