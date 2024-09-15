import Signup from '../../components/signup/Signup';
import Login from '../../components/login/Login';
import Home from '../../components/home/Home';
import TestAuth from '../../components/protectedEndpoint/ProtectedEndpoint';
import NotFound from '../../components/notFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import UnprotectedEndpoint from '../../components/unprotectedEndpoint/unprotectedEndpoint';

import KubernetesSection from '../accordion/learningResources/kubernetesNotes/KubernetesSection';
import PodsSection from '../accordion/learningResources/kubernetesNotes/PodsSection';
import A1a from '../accordion/learningResources/kubernetesNotes/A1a';
import A1ai from '../accordion/learningResources/kubernetesNotes/A1ai';
import A1b from '../accordion/learningResources/kubernetesNotes/A1b';
import A2 from '../accordion/learningResources/kubernetesNotes/A2';
import A3 from '../accordion/learningResources/kubernetesNotes/A3';
import A3a from '../accordion/learningResources/kubernetesNotes/A3a';
import OtherSection from '../accordion/learningResources/otherNotes/OtherSection';
import B1 from '../accordion/learningResources/otherNotes/B1';
import B2 from '../accordion/learningResources/otherNotes/B2';
import B2a from '../accordion/learningResources/otherNotes/B2a';
import B2ai from '../accordion/learningResources/otherNotes/B2ai';

import CurrentPathDisplay from '../currentPathDisplay/CurrentPathDisplay';

function MainContent() {
	return (
		<>
			<div className="p-2 bg-purple-500 h-[5000px]">
				<CurrentPathDisplay />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/protected" element={<TestAuth />} />
					<Route
						path="/unprotected"
						element={<UnprotectedEndpoint />}
					/>

					{/* Test Routes */}
					<Route path="/kubernetes" element={<KubernetesSection />} />
					<Route path="/kubernetes/pods" element={<PodsSection />} />
					<Route path="/kubernetes/pods/a" element={<A1a />} />
					<Route path="/kubernetes/pods/a/i" element={<A1ai />} />
					<Route path="/kubernetes/pods/b" element={<A1b />} />
					<Route path="/kubernetes/2" element={<A2 />} />
					<Route path="/kubernetes/3" element={<A3 />} />
					<Route path="/kubernetes/3/a" element={<A3a />} />

					<Route path="/other" element={<OtherSection />} />
					<Route path="/other/1" element={<B1 />} />
					<Route path="/other/2" element={<B2 />} />
					<Route path="/other/2/a" element={<B2a />} />
					<Route path="/other/2/a/i" element={<B2ai />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default MainContent;
