/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{jsx,tsx}", "./*.html"],
    theme: {
        extend: {
            colors: {
                dark: "#0a0a14",
                darkHover: "#1e2130",
                light: "#f5f5f5",
                primary: "#00e6a0",
                danger: "#ef4444",
            },
            fontFamily: {
                grotesk: ["Space Grotesk", "sans-serif"],
            },
            animation: {
                "up-down": "up-down 2s ease-in-out infinite alternate",
            },
        },
    },
    plugins: [],
}
