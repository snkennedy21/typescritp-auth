import Signup from '../../components/signup/Signup';
import Login from '../../components/login/Login';
import Home from '../../components/home/Home';
import TestAuth from '../../components/protectedEndpoint/ProtectedEndpoint';
import NotFound from '../../components/notFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import UnprotectedEndpoint from '../../components/unprotectedEndpoint/unprotectedEndpoint';

import KubernetesSection from '../accordion/learningResources/kubernetesNotes/KubernetesSection';
import PodsSection from '../accordion/learningResources/kubernetesNotes/pods/PodsSection';
import DeploymentSyntax from '../accordion/learningResources/kubernetesNotes/deployments/DeploymentSyntax';
import DeploymentsSection from '../accordion/learningResources/kubernetesNotes/deployments/DeploymentsSection';

import ReplicaSetSection from '../accordion/learningResources/kubernetesNotes/replicaSets/ReplicaSetSection';
import ReplicaSetSyntax from '../accordion/learningResources/kubernetesNotes/replicaSets/ReplicasetSyntax';

import PodSyntax from '../accordion/learningResources/kubernetesNotes/pods/PodSyntax';
import OtherSection from '../accordion/learningResources/otherNotes/OtherSection';
import B1 from '../accordion/learningResources/otherNotes/B1';
import B2 from '../accordion/learningResources/otherNotes/B2';
import B2a from '../accordion/learningResources/otherNotes/B2a';
import B2ai from '../accordion/learningResources/otherNotes/B2ai';
import Settings from '../settings/Settings';

import CurrentPathDisplay from '../currentPathDisplay/CurrentPathDisplay';

function MainContent() {
	return (
		<>
			<div className="p-2">
				<CurrentPathDisplay />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/settings" element={<Settings />} />
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
					<Route
						path="/kubernetes/pods/syntax"
						element={<PodSyntax />}
					/>

					<Route
						path="/kubernetes/replicasets"
						element={<ReplicaSetSection />}
					/>

					<Route
						path="/kubernetes/replicasets/syntax"
						element={<ReplicaSetSyntax />}
					/>

					<Route
						path="/kubernetes/deployments"
						element={<DeploymentsSection />}
					/>
					<Route
						path="/kubernetes/deployments/syntax"
						element={<DeploymentSyntax />}
					/>

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
