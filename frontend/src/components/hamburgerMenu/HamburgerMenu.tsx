import { useDispatch } from 'react-redux';
import { openMobileNavigation } from '../../store/navigationSlice';

function HamburgerMenu() {
	const dispatch = useDispatch();

	return (
		<div className="p-4 bg-gray-200">
			<button
				onClick={() => dispatch(openMobileNavigation())}
				className="text-xl font-bold"
			>
				☰
			</button>
		</div>
	);
}

export default HamburgerMenu;
