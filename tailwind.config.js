/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // Deep blue (primary) - blue-800
        'secondary': '#64748B', // Neutral slate (secondary) - slate-500
        'accent': '#0EA5E9', // Bright blue (accent) - sky-500
        
        // Background Colors
        'background': '#FAFBFC', // Soft off-white (background) - gray-50
        'surface': '#FFFFFF', // Pure white (surface) - white
        
        // Text Colors
        'text': {
          'primary': '#1E293B', // Dark slate (text primary) - slate-800
          'secondary': '#64748B', // Medium gray (text secondary) - slate-500
        },
        
        // Status Colors
        'success': '#059669', // Professional green (success) - emerald-600
        'warning': '#D97706', // Amber (warning) - amber-600
        'error': '#DC2626', // Clear red (error) - red-600
        
        // Border Colors
        'border': '#E2E8F0', // Light gray (border) - slate-200
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
      borderRadius: {
        'DEFAULT': '4px',
        'lg': '8px',
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}