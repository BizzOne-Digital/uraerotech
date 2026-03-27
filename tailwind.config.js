/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        aviation: {
          blue: '#1e3a8a',
          'blue-light': '#3b82f6',
          'blue-dark': '#1e40af',
          purple: '#6366f1',
        },
      },
      backgroundImage: {
        'gradient-aviation': 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #6366f1 100%)',
        'gradient-dark': 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(99, 102, 241, 0.5)',
      },
    },
  },
  plugins: [],
}
