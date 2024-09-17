import { useDispatch } from 'react-redux';
import { openMobileNavigation } from '../../store/navigationSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function HamburgerMenu() {
	const dispatch = useDispatch();

	return (
		<div className="p-3 border-b border-grey-200">
			<button
				onClick={() => dispatch(openMobileNavigation())}
				className="flex items-center justify-center"
			>
				<FontAwesomeIcon
					icon={faBars}
					className="w-6 h-6 hover:text-blue-400 transition duration-200"
				/>
			</button>
		</div>
	);
}

export default HamburgerMenu;
