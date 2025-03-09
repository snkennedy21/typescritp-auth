import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../store/mainApi';
import { unauthenticateUser } from '../../store/authSlice';
import { IoMdPerson } from 'react-icons/io';

const ProfileDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();
	const [logout] = useLogoutMutation();
	const currentUser = useSelector((state) => state.auth.currentUser);

	const handleLogout = () => {
		logout();
		dispatch(unauthenticateUser());
	};

	const toggleDropdown = () => setIsOpen(!isOpen);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<div
				onClick={toggleDropdown}
				className="relative h-8 w-8 bg-[#b8b8b8] rounded-full overflow-hidden hover:cursor-pointer"
			>
				<IoMdPerson className="h-9 w-9 text-[#f2f2f2] absolute -translate-x-[2px] translate-y-[1px]" />
			</div>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-200">
					<a
						href="/profile"
						className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						{`Profile (${currentUser?.name})`}
					</a>
					<a
						href="/settings"
						className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						Settings
					</a>
					<button
						onClick={handleLogout}
						className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfileDropdown;
