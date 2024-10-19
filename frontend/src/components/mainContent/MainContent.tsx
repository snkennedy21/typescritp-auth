import Signup from '../../components/signup/Signup';
import Login from '../../components/login/Login';
import Home from '../../components/home/Home';
import TestAuth from '../../components/protectedEndpoint/ProtectedEndpoint';
import NotFound from '../../components/notFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import UnprotectedEndpoint from '../../components/unprotectedEndpoint/unprotectedEndpoint';

import KubernetesSection from '../learningResources/kubernetesNotes/KubernetesSection';
import PodsSection from '../learningResources/kubernetesNotes/pods/PodsSection';
import DeploymentSyntax from '../learningResources/kubernetesNotes/deployments/DeploymentSyntax';
import DeploymentsSection from '../learningResources/kubernetesNotes/deployments/DeploymentsSection';

import ReplicaSetSection from '../learningResources/kubernetesNotes/replicaSets/ReplicaSetSection';
import ReplicaSetSyntax from '../learningResources/kubernetesNotes/replicaSets/ReplicasetSyntax';

import VariablesSection from '../learningResources/kubernetesNotes/variables/VariablesSection';
import ConfigMapsSection from '../learningResources/kubernetesNotes/variables/configMaps/ConfigMapsSection';
import ConfigMapSyntax from '../learningResources/kubernetesNotes/variables/configMaps/ConfigMapsSyntax';

import SecretsSection from '../learningResources/kubernetesNotes/variables/secrets/SecretsSection';
import SecretsSyntax from '../learningResources/kubernetesNotes/variables/secrets/SecretsSyntax';

import ExamTips from '../learningResources/kubernetesNotes/examTips/ExamTips';

import ResourcesSection from '../learningResources/kubernetesNotes/resources/ResourcesSection';
import ResourcesSyntax from '../learningResources/kubernetesNotes/resources/ResourcesSyntax';

import TaintsAndTolerationsSection from '../learningResources/kubernetesNotes/taints/TaintsAndTolerationsSection';
import TaintsAndTolerationsSyntax from '../learningResources/kubernetesNotes/taints/TaintsAndTolerationsSyntax';

import SelectorsAndAffinitySection from '../learningResources/kubernetesNotes/selectorsAndAffinity/SelectorsAndAffinitySection';
import SelectorsAndAffinitySyntax from '../learningResources/kubernetesNotes/selectorsAndAffinity/SelectorsAndAffinitySyntax';

import ProbesSection from '../learningResources/kubernetesNotes/probes/ProbesSection';
import ProbesSyntax from '../learningResources/kubernetesNotes/probes/ProbesSyntax';

import PodSyntax from '../learningResources/kubernetesNotes/pods/PodSyntax';
import OtherSection from '../learningResources/otherNotes/OtherSection';
import B1 from '../learningResources/otherNotes/B1';
import B2 from '../learningResources/otherNotes/B2';
import B2a from '../learningResources/otherNotes/B2a';
import B2ai from '../learningResources/otherNotes/B2ai';
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
					<Route
						path="/kubernetes/exam-tips"
						element={<ExamTips />}
					/>
					<Route
						path="/kubernetes/variables"
						element={<VariablesSection />}
					/>
					<Route
						path="/kubernetes/variables/configmaps"
						element={<ConfigMapsSection />}
					/>
					<Route
						path="/kubernetes/variables/configmaps/syntax"
						element={<ConfigMapSyntax />}
					/>
					<Route
						path="/kubernetes/variables/secrets"
						element={<SecretsSection />}
					/>
					<Route
						path="/kubernetes/variables/secrets/syntax"
						element={<SecretsSyntax />}
					/>

					<Route
						path="/kubernetes/resources"
						element={<ResourcesSection />}
					/>
					<Route
						path="/kubernetes/resources/syntax"
						element={<ResourcesSyntax />}
					/>
					<Route
						path="/kubernetes/taints-tolerations"
						element={<TaintsAndTolerationsSection />}
					/>
					<Route
						path="/kubernetes/taints-tolerations/syntax"
						element={<TaintsAndTolerationsSyntax />}
					/>
					<Route
						path="/kubernetes/selectors-affinity"
						element={<SelectorsAndAffinitySection />}
					/>
					<Route
						path="/kubernetes/selectors-affinity/syntax"
						element={<SelectorsAndAffinitySyntax />}
					/>
					<Route
						path="/kubernetes/probes"
						element={<ProbesSection />}
					/>
					<Route
						path="/kubernetes/probes/syntax"
						element={<ProbesSyntax />}
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
