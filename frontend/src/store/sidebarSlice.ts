import { createSlice } from '@reduxjs/toolkit';
import KubernetesSection from '../components/learningResources/kubernetesNotes/KubernetesSection';

import PodsSection from '../components/learningResources/kubernetesNotes/pods/PodsSection';
import PodSyntax from '../components/learningResources/kubernetesNotes/pods/PodSyntax';

import DeploymentSyntax from '../components/learningResources/kubernetesNotes/deployments/DeploymentSyntax';
import DeploymentsSection from '../components/learningResources/kubernetesNotes/deployments/DeploymentsSection';

import ReplicaSetSection from '../components/learningResources/kubernetesNotes/replicaSets/ReplicaSetSection';
import ReplicaSetSyntax from '../components/learningResources/kubernetesNotes/replicaSets/ReplicasetSyntax';

import VariablesSection from '../components/learningResources/kubernetesNotes/variables/VariablesSection';
import ConfigMapsSection from '../components/learningResources/kubernetesNotes/variables/configMaps/ConfigMapsSection';
import ConfigMapSyntax from '../components/learningResources/kubernetesNotes/variables/configMaps/ConfigMapsSyntax';

import SecretsSection from '../components/learningResources/kubernetesNotes/variables/secrets/SecretsSection';
import SecretsSyntax from '../components/learningResources/kubernetesNotes/variables/secrets/SecretsSyntax';

import ExamTips from '../components/learningResources/kubernetesNotes/examTips/ExamTips';

import ResourcesSection from '../components/learningResources/kubernetesNotes/resources/ResourcesSection';
import ResourcesSyntax from '../components/learningResources/kubernetesNotes/resources/ResourcesSyntax';

import TaintsAndTolerationsSection from '../components/learningResources/kubernetesNotes/taints/TaintsAndTolerationsSection';
import TaintsAndTolerationsSyntax from '../components/learningResources/kubernetesNotes/taints/TaintsAndTolerationsSyntax';

import SelectorsAndAffinitySection from '../components/learningResources/kubernetesNotes/selectorsAndAffinity/SelectorsAndAffinitySection';
import SelectorsAndAffinitySyntax from '../components/learningResources/kubernetesNotes/selectorsAndAffinity/SelectorsAndAffinitySyntax';

import ProbesSection from '../components/learningResources/kubernetesNotes/probes/ProbesSection';
import ProbesSyntax from '../components/learningResources/kubernetesNotes/probes/ProbesSyntax';

import DeploymentTutorial from '../components/learningResources/deploymentTutorial/DeploymentTutorial';

const initialState = {
	accordions: [
		{
			text: 'Deployment Tutorial',
			link: 'deployment-tutorial',
			component: DeploymentTutorial,
			open: false,
			subsections: [],
		},
		{
			text: 'Kubernetes',
			link: 'kubernetes',
			component: KubernetesSection,
			open: false,
			subsections: [
				{
					text: 'Pods',
					link: 'kubernetes/pods',
					component: PodsSection,
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: 'kubernetes/pods/syntax',
							component: PodSyntax,
						},
					],
				},
				{
					text: 'ReplicaSets',
					link: 'kubernetes/replicasets',
					component: ReplicaSetSection,
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: 'kubernetes/replicasets/syntax',
							component: ReplicaSetSyntax,
						},
					],
				},
				{
					text: 'Deployments',
					link: 'kubernetes/deployments',
					component: DeploymentsSection,
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: 'kubernetes/deployments/syntax',
							component: DeploymentSyntax,
						},
					],
				},
				{
					text: 'Exam Tips',
					link: 'kubernetes/exam-tips',
					component: ExamTips,
					open: false,
				},
				{
					text: 'Variables',
					link: 'kubernetes/variables',
					component: VariablesSection,
					open: false,
					subsections: [
						{
							text: 'ConfigMaps',
							link: 'kubernetes/variables/configmaps',
							component: ConfigMapsSection,
							open: false,
							subsections: [
								{
									text: 'Syntax',
									link: 'kubernetes/variables/configmaps/syntax',
									component: ConfigMapSyntax,
								},
							],
						},
						{
							text: 'Secrets',
							link: 'kubernetes/variables/secrets',
							component: SecretsSection,
							open: false,
							subsections: [
								{
									text: 'Syntax',
									link: 'kubernetes/variables/secrets/syntax',
									component: SecretsSyntax,
								},
							],
						},
					],
				},
				{
					text: 'Resources',
					link: 'kubernetes/resources',
					component: ResourcesSection,
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: 'kubernetes/resources/syntax',
							component: ResourcesSyntax,
						},
					],
				},
				{
					text: 'Taints and Tolerations',
					link: 'kubernetes/taints-tolerations',
					component: TaintsAndTolerationsSection,
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: 'kubernetes/taints-tolerations/syntax',
							component: TaintsAndTolerationsSyntax,
						},
					],
				},
				{
					text: 'Selectors and Affinity',
					link: 'kubernetes/selectors-affinity',
					component: SelectorsAndAffinitySection,
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: 'kubernetes/selectors-affinity/syntax',
							component: SelectorsAndAffinitySyntax,
						},
					],
				},
				{
					text: 'Probes',
					link: 'kubernetes/probes',
					component: ProbesSection,
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: 'kubernetes/probes/syntax',
							component: ProbesSyntax,
						},
					],
				},
			],
		},
	],
};

export const sidebarSlice = createSlice({
	name: 'sidebarSlice',
	initialState: initialState,
	reducers: {
		setAccordions: (state, actions) => {
			state.accordions = actions.payload;
		},
		updateAccordionState: (state, { payload }) => {
			const { navLink, open } = payload;

			// Recursive function to find and update the accordion by navLink
			const updateAccordion = (accordions) => {
				return accordions.map((accordion) => {
					// If the current accordion matches the navLink, update its open state
					if (accordion.link === navLink) {
						return { ...accordion, open };
					}

					// If there are subsections, recurse
					if (accordion.subsections) {
						return {
							...accordion,
							subsections: updateAccordion(accordion.subsections),
						};
					}

					return accordion;
				});
			};

			// Update the accordions in the state
			state.accordions = updateAccordion(state.accordions);
		},

		closeAllAccordions: (state) => {
			// Recursive function to close all accordions
			const closeAccordion = (accordions) => {
				return accordions.map((accordion) => {
					// If there are subsections, recurse and close them as well
					if (accordion.subsections) {
						return {
							...accordion,
							open: false,
							subsections: closeAccordion(accordion.subsections),
						};
					}

					// Set the open state to false for the accordion
					return { ...accordion, open: false };
				});
			};

			// Update the accordions in the state to all be closed
			state.accordions = closeAccordion(state.accordions);
		},
	},
});

export const { setAccordions, updateAccordionState, closeAllAccordions } =
	sidebarSlice.actions;
