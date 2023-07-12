/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,css}", "./src/components/*.{html,js,jsx,css}"],
	daisyui: {
		themes: ['night','emerald'],
		extend: {}
	},
	plugins: [require("daisyui")]
};