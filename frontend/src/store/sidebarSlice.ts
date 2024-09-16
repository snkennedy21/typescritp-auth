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
							text: 'Pods A',
							link: '/kubernetes/pods/a',
						},
						{
							text: 'Pods B',
							link: '/kubernetes/pods/b',
						},
					],
				},
				{
					text: 'A2',
					link: '/kubernetes/2',
					open: false,
				},
				{
					text: 'A3',
					link: '/kubernetes/3',
					open: false,
					subsections: [
						{
							text: 'A3a',
							link: '/kubernetes/3/a',
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
					text: 'B1',
					link: '/other/1',
					open: false,
				},
				{
					text: 'B2',
					link: '/other/2',
					open: false,
					subsections: [
						{
							text: 'B2a',
							link: '/other/2/a',
							open: false,
							subsections: [
								{
									text: 'B2ai',
									link: '/other/2/a/i',
									open: false,
								},
							],
						},
					],
				},
				{
					text: 'B3',
					link: '/other/3',
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
	},
});

export const { setAccordions } = sidebarSlice.actions;
