import { Route, Routes } from 'react-router-dom';
import LearningLayout from '../learningLayout/LearningLayout';
import Home from '../home/Home';
import Navbar from '../navbar/Navbar';

const ApplicationLayout = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/learning/*" element={<LearningLayout />} />
			</Routes>
		</>
	);
};

export default ApplicationLayout;
