/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				darkBackground: '#3c3c3c;',
				darkText: '#f3f3f3',
			},
		},
	},
	plugins: [],
};
