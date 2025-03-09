import NotFound from '../../components/notFound/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CurrentPathDisplay from '../currentPathDisplay/CurrentPathDisplay';
import Settings from '../settings/Settings';
import LearningPage from '../learningResources/LearningPage';
import { closeAllAccordions } from '../../store/sidebarSlice';
import { useEffect } from 'react';
import CurrentPageActions from '../currentPageActions/CurrentPageActions';

function MainContent() {
	const dispatch = useDispatch();
	const { accordions } = useSelector((state) => state.sidebarSlice);

	const renderRoutes = (accordions) => {
		return accordions.flatMap((accordion) => {
			// Main route for the current accordion
			const routes = [
				<Route
					key={accordion.link}
					path={accordion.link}
					element={<accordion.component />}
				/>,
			];

			// Check if the accordion has subsections and call renderRoutes recursively
			if (accordion.subsections && accordion.subsections.length > 0) {
				routes.push(...renderRoutes(accordion.subsections));
			}

			return routes;
		});
	};

	useEffect(() => {
		return () => {
			console.log('RUNNING');
			dispatch(closeAllAccordions());
		};
	}, []);

	return (
		<>
			<div className="p-2">
				<CurrentPathDisplay />
				<CurrentPageActions />
				<Routes>
					<Route path="/" element={<LearningPage />} />
					{renderRoutes(accordions)}
					<Route path="settings" element={<Settings />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default MainContent;
