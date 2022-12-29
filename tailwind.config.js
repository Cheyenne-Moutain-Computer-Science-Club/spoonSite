/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkerblue: {
                    100: "#0F1623",
                },
            },
        },
    },
    plugins: [require("prettier-plugin-tailwindcss")],
};
