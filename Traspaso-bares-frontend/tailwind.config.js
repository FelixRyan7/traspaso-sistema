/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
         primary: {
          DEFAULT: "#1a759f",
          soft: "#e0f2f7",
          strong: "#145a7a",
        },
         white: {
          DEFAULT: "#f8faf9",
          soft: "#ffffff",
          strong: "#eef2f1",
        },

        gray: {
          light: "#d9e2e8",
          DEFAULT: "#9aa5b1",
          dark: "#52606d",
        },

        dark: {
          DEFAULT: "#1f2933",
          soft: "#2a3642",
          strong: "#141b22",
        },
        success: {
          DEFAULT: "#52b788",
          soft: "#e6f4ec",
          strong: "#2d6a4f",
        },

        warning: {
          DEFAULT: "#f4c95d",
          soft: "#fdf6e3",
          strong: "#c99700",
        },

        error: {
          DEFAULT: "#e57373",
          soft: "#fdecec",
          strong: "#b23a48",
        },
      },
    },
  },
  plugins: [],
}
