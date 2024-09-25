import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accordions: [
		{
			text: 'Kubernetes',
			link: '/kubernetes',
			open: false,
			subsections: [
				{
					text: 'Pods',
					link: '/kubernetes/pods',
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: '/kubernetes/pods/syntax',
						},
					],
				},
				{
					text: 'ReplicaSets',
					link: '/kubernetes/replicasets',
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: '/kubernetes/replicasets/syntax',
						},
					],
				},
				{
					text: 'Deployments',
					link: '/kubernetes/deployments',
					open: false,
					subsections: [
						{
							text: 'Syntax',
							link: '/kubernetes/deployments/syntax',
						},
					],
				},
			],
		},
		{
			text: 'Other Tech',
			link: '/other',
			open: false,
			subsections: [
				{
					text: 'Subsection',
					link: '/other/subsection',
					open: false,
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
	},
});

export const { setAccordions, updateAccordionState } = sidebarSlice.actions;
