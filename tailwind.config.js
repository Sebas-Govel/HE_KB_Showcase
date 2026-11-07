/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist_site/**/*.{html,js}",
    "./dist_site/*.html"
  ],
  theme: {
    extend: {
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        paper: {
          base: '#FAF7F2',
          surface: '#F2EDE4',
          card: '#FFFFFF',
          border: '#E5DEC9',
        },
        ink: {
          primary: '#1E1D1A',
          secondary: '#5C5852',
          muted: '#6E685F',
        },
        accent: {
          terracotta: '#C85A32',
          'terracotta-hover': '#B04D28',
          'terracotta-soft': '#F8E6DE',
          sage: '#2F6B4F',
          'sage-soft': '#EBF2EE',
          ochre: '#C98A2C',
          'ochre-soft': '#FAF2E4',
        }
      }
    }
  },
  plugins: [],
}
