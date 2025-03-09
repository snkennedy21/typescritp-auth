import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from '../profileDropdown/ProfileDropdown';

const Navbar = () => {
	const currentUser = useSelector((state) => state.auth.currentUser);

	return (
		<nav
			className={`${currentUser ? 'py-3' : 'py-4'} bg-gradient-to-r from-[#0eabd2] to-[#6249e3] fixed top-0 w-full z-10 flex justify-between items-center px-6`}
		>
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
			{currentUser ? (
				<ProfileDropdown />
			) : (
				<Link to="/login" className="text-white">
					Login
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
