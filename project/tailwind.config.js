/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cores baseadas na identidade visual do LIRGE
        'lirge': {
          'light': '#00B4D8', // Azul claro/ciano
          'dark': '#003566',  // Azul profundo esverdeado
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(0, 180, 216, 0.2), 0 0 20px rgba(0, 180, 216, 0.1)'
          },
          '100%': {
            boxShadow: '0 0 10px rgba(0, 180, 216, 0.4), 0 0 30px rgba(0, 180, 216, 0.2)'
          }
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};