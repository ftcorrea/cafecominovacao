/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        // Tema Escuro (padrão)
        dark: {
          bg: {
            primary: '#0a0a0f',
            secondary: '#12121a',
            card: '#1a1a24',
            'card-hover': '#22222e',
          },
          border: '#2a2a3a',
          text: {
            primary: '#f0f0f5',
            secondary: '#8888a0',
          },
        },
        // Tema Claro
        light: {
          bg: {
            primary: '#f8f9fc',
            secondary: '#ffffff',
            card: '#ffffff',
            'card-hover': '#f0f2f8',
          },
          border: '#e2e4ea',
          text: {
            primary: '#1a1a2e',
            secondary: '#6b7080',
          },
        },
        // Cores de Accent e Fontes
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        sources: {
          techcrunch: '#00aa00',
          verge: '#fa4b2a',
          nvidia: '#76b900',
          openai: '#10a37f',
          anthropic: '#d4a574',
          google: '#4285f4',
          meta: '#0668E1',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
