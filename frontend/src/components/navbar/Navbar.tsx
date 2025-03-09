import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../store/mainApi';

const Navbar = () => {
	const currentUser = useSelector((state) => state.auth.currentUser);
	const [logout] = useLogoutMutation();

	const handleLogout = () => {
		logout();
	};

	return (
		<nav className="bg-gradient-to-r from-[#0eabd2] to-[#6249e3] p-4 fixed top-0 w-full z-10 flex justify-between items-center">
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
				<div onClick={handleLogout} className="text-white">
					Logout
				</div>
			) : (
				<Link to="/login" className="text-white">
					Login
				</Link>
			)}
			{/* <IoPersonCircleOutline className="w-8 h-8 text-white" /> */}
		</nav>
	);
};

export default Navbar;
