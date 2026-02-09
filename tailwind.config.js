/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./*.html",
        "./src/**/*.{js,jsx,ts,tsx,css}",
    ],
    theme: {
        extend: {
            colors: {
                'was-blue': '#1a2b4a',
                'was-orange': '#f5a623',
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
