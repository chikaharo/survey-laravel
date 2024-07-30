/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                huyDinh: "fadeInCus 5s ease-in-out",
            },
            keyframes: {
                fadeInCus: {
                    "0%,100%": { opacity: 0, transform: "translateY(-150px)" },
                    "50%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
