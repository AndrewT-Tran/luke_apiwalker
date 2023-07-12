/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,css}", "./src/components/*.{html,js,jsx,css}"],
	theme: {
		extend: {}
	},
	plugins: [require("daisyui")]
};