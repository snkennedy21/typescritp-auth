import { Route, Routes } from 'react-router-dom';
import LearningLayout from '../learningLayout/LearningLayout';
import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Navbar from '../navbar/Navbar';
import CommentsPanel from '../commentsPanel/CommentsPanel';

const ApplicationLayout = () => {
	return (
		<>
			<Navbar />
			<div className="mt-14">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/learning/*" element={<LearningLayout />} />
				</Routes>
				<CommentsPanel />
			</div>
		</>
	);
};

export default ApplicationLayout;
