// routesConfig.ts
import Home from '../components/home/Home';
import Signup from '../components/signup/Signup';
import Login from '../components/login/Login';
import TestAuth from '../components/protectedEndpoint/ProtectedEndpoint';
import UnprotectedEndpoint from '../components/unprotectedEndpoint/unprotectedEndpoint';
import KubernetesSection from '../components/learningResources/kubernetesNotes/KubernetesSection';
import PodsSection from '../components/learningResources/kubernetesNotes/pods/PodsSection';
import PodSyntax from '../components/learningResources/kubernetesNotes/pods/PodSyntax';
import ReplicaSetSection from '../components/learningResources/kubernetesNotes/replicaSets/ReplicaSetSection';
import ReplicaSetSyntax from '../components/learningResources/kubernetesNotes/replicaSets/ReplicasetSyntax';
import DeploymentsSection from '../components/learningResources/kubernetesNotes/deployments/DeploymentsSection';
import DeploymentSyntax from '../components/learningResources/kubernetesNotes/deployments/DeploymentSyntax';
import VariablesSection from '../components/learningResources/kubernetesNotes/variables/VariablesSection';
import ConfigMapsSection from '../components/learningResources/kubernetesNotes/variables/configMaps/ConfigMapsSection';
import ConfigMapSyntax from '../components/learningResources/kubernetesNotes/variables/configMaps/ConfigMapsSyntax';
import SecretsSection from '../components/learningResources/kubernetesNotes/variables/secrets/SecretsSection';
import SecretsSyntax from '../components/learningResources/kubernetesNotes/variables/secrets/SecretsSyntax';
import ResourcesSection from '../components/learningResources/kubernetesNotes/resources/ResourcesSection';
import ResourcesSyntax from '../components/learningResources/kubernetesNotes/resources/ResourcesSyntax';
import TaintsAndTolerationsSection from '../components/learningResources/kubernetesNotes/taints/TaintsAndTolerationsSection';
import TaintsAndTolerationsSyntax from '../components/learningResources/kubernetesNotes/taints/TaintsAndTolerationsSyntax';
import SelectorsAndAffinitySection from '../components/learningResources/kubernetesNotes/selectorsAndAffinity/SelectorsAndAffinitySection';
import SelectorsAndAffinitySyntax from '../components/learningResources/kubernetesNotes/selectorsAndAffinity/SelectorsAndAffinitySyntax';
import ProbesSection from '../components/learningResources/kubernetesNotes/probes/ProbesSection';
import ProbesSyntax from '../components/learningResources/kubernetesNotes/probes/ProbesSyntax';
import ExamTips from '../components/learningResources/kubernetesNotes/examTips/ExamTips';

export const routesConfig = [
	{
		path: '/',
		component: Home,
		sidebar: {
			text: 'Home',
			link: '/',
		},
	},
	{
		path: '/signup',
		component: Signup,
		sidebar: {
			text: 'Signup',
			link: '/signup',
		},
	},
	{
		path: '/login',
		component: Login,
		sidebar: {
			text: 'Login',
			link: '/login',
		},
	},
	{
		path: '/protected',
		component: TestAuth,
		sidebar: {
			text: 'Protected Endpoint',
			link: '/protected',
		},
	},
	{
		path: '/unprotected',
		component: UnprotectedEndpoint,
		sidebar: {
			text: 'Unprotected Endpoint',
			link: '/unprotected',
		},
	},
	{
		path: '/kubernetes',
		component: KubernetesSection,
		sidebar: {
			text: 'Kubernetes',
			link: '/kubernetes',
			subsections: [
				{
					path: '/kubernetes/pods',
					component: PodsSection,
					sidebar: {
						text: 'Pods',
						link: '/kubernetes/pods',
						subsections: [
							{
								path: '/kubernetes/pods/syntax',
								component: PodSyntax,
								sidebar: {
									text: 'Pod Syntax',
									link: '/kubernetes/pods/syntax',
								},
							},
						],
					},
				},
				{
					path: '/kubernetes/replicasets',
					component: ReplicaSetSection,
					sidebar: {
						text: 'ReplicaSets',
						link: '/kubernetes/replicasets',
						subsections: [
							{
								path: '/kubernetes/replicasets/syntax',
								component: ReplicaSetSyntax,
								sidebar: {
									text: 'ReplicaSet Syntax',
									link: '/kubernetes/replicasets/syntax',
								},
							},
						],
					},
				},
				{
					path: '/kubernetes/deployments',
					component: DeploymentsSection,
					sidebar: {
						text: 'Deployments',
						link: '/kubernetes/deployments',
						subsections: [
							{
								path: '/kubernetes/deployments/syntax',
								component: DeploymentSyntax,
								sidebar: {
									text: 'Deployment Syntax',
									link: '/kubernetes/deployments/syntax',
								},
							},
						],
					},
				},
				{
					path: '/kubernetes/exam-tips',
					component: ExamTips,
					sidebar: {
						text: 'Exam Tips',
						link: '/kubernetes/exam-tips',
					},
				},
				{
					path: '/kubernetes/variables',
					component: VariablesSection,
					sidebar: {
						text: 'Variables',
						link: '/kubernetes/variables',
						subsections: [
							{
								path: '/kubernetes/variables/configmaps',
								component: ConfigMapsSection,
								sidebar: {
									text: 'ConfigMaps',
									link: '/kubernetes/variables/configmaps',
									subsections: [
										{
											path: '/kubernetes/variables/configmaps/syntax',
											component: ConfigMapSyntax,
											sidebar: {
												text: 'ConfigMap Syntax',
												link: '/kubernetes/variables/configmaps/syntax',
											},
										},
									],
								},
							},
							{
								path: '/kubernetes/variables/secrets',
								component: SecretsSection,
								sidebar: {
									text: 'Secrets',
									link: '/kubernetes/variables/secrets',
									subsections: [
										{
											path: '/kubernetes/variables/secrets/syntax',
											component: SecretsSyntax,
											sidebar: {
												text: 'Secret Syntax',
												link: '/kubernetes/variables/secrets/syntax',
											},
										},
									],
								},
							},
						],
					},
				},
				{
					path: '/kubernetes/resources',
					component: ResourcesSection,
					sidebar: {
						text: 'Resources',
						link: '/kubernetes/resources',
						subsections: [
							{
								path: '/kubernetes/resources/syntax',
								component: ResourcesSyntax,
								sidebar: {
									text: 'Resource Syntax',
									link: '/kubernetes/resources/syntax',
								},
							},
						],
					},
				},
				{
					path: '/kubernetes/taints-tolerations',
					component: TaintsAndTolerationsSection,
					sidebar: {
						text: 'Taints and Tolerations',
						link: '/kubernetes/taints-tolerations',
						subsections: [
							{
								path: '/kubernetes/taints-tolerations/syntax',
								component: TaintsAndTolerationsSyntax,
								sidebar: {
									text: 'Taints and Tolerations Syntax',
									link: '/kubernetes/taints-tolerations/syntax',
								},
							},
						],
					},
				},
				{
					path: '/kubernetes/selectors-affinity',
					component: SelectorsAndAffinitySection,
					sidebar: {
						text: 'Selectors and Affinity',
						link: '/kubernetes/selectors-affinity',
						subsections: [
							{
								path: '/kubernetes/selectors-affinity/syntax',
								component: SelectorsAndAffinitySyntax,
								sidebar: {
									text: 'Selectors and Affinity Syntax',
									link: '/kubernetes/selectors-affinity/syntax',
								},
							},
						],
					},
				},
				{
					path: '/kubernetes/probes',
					component: ProbesSection,
					sidebar: {
						text: 'Probes',
						link: '/kubernetes/probes',
						subsections: [
							{
								path: '/kubernetes/probes/syntax',
								component: ProbesSyntax,
								sidebar: {
									text: 'Probes Syntax',
									link: '/kubernetes/probes/syntax',
								},
							},
						],
					},
				},
			],
		},
	},
];
