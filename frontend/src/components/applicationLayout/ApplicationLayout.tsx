import { Route, Routes } from 'react-router-dom';
import LearningLayout from '../learningLayout/LearningLayout';
import Home from '../home/Home';
import Navbar from '../navbar/Navbar';

const ApplicationLayout = () => {
	return (
		<>
			<Navbar />
			<div className="mt-14">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/learning/*" element={<LearningLayout />} />
				</Routes>
			</div>
		</>
	);
};

export default ApplicationLayout;
