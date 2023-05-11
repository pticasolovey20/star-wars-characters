/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				dark: {
					100: "#0F0F0F",
					200: "#212121",
				},
				silver: {
					100: "#CCCCCC",
				},
			},

			screens: {
				xs: "300px",
				sm: "449px",
				md: "768px",
				lg: "950px",
				xl: "1128px",
			},
		},
	},
	plugins: [],
};
