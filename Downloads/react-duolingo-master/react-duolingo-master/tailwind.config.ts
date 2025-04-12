import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A', // Azul escuro profissional
          light: '#2563EB',   // Azul médio
          dark: '#1E40AF',    // Azul mais escuro
        },
        secondary: {
          DEFAULT: '#4B5563', // Cinza neutro
          light: '#9CA3AF',   // Cinza claro
          dark: '#374151',    // Cinza escuro
        },
        accent: {
          DEFAULT: '#3B82F6', // Azul de destaque
          light: '#60A5FA',   // Azul claro
          dark: '#1D4ED8',    // Azul escuro
        },
        background: {
          DEFAULT: '#FFFFFF', // Branco
          dark: '#F3F4F6',    // Cinza muito claro
        },
        text: {
          DEFAULT: '#111827', // Preto quase puro
          light: '#4B5563',   // Cinza médio
          dark: '#1F2937',    // Cinza escuro
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Source Sans Pro', 'system-ui', 'sans-serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
