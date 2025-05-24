/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1' }],      // 12px
        sm:   ['0.875rem', { lineHeight: '1.5' }],    // 14px
        base: ['1rem',     { lineHeight: '1.625' }],  // 16px
        lg:   ['1.125rem', { lineHeight: '1.625' }],  // 18px
        xl:   ['1.25rem',  { lineHeight: '1.625' }],  // 20px
        '2xl':['1.5rem',   { lineHeight: '1.25' }],   // 24px
        '3xl':['1.875rem', { lineHeight: '1.25' }],   // 30px
        '4xl':['2.25rem',  { lineHeight: '1.25' }],   // 36px
      },
      fontWeight: {
        light:   '300',
        normal:  '400',
        medium:  '500',
        semibold:'600',
        bold:    '700',
      },
      lineHeight: {
        none:    '1',
        tight:   '1.25',
        normal:  '1.5',
        relaxed: '1.625',
        loose:   '1.825',
      },
      letterSpacing: {
        tight:  '-0.025em',
        normal: '0',
        wide:   '0.025em',
        wider:  '0.05em',
      },
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#17314a',
          700: '#10273b',
          800: '#091d2d',
          900: '#030e19',
        },
        neutral: {
          50:  '#fcfcfc',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        success: {
          50:  '#ebf9f7',
          500: '#0fa892',
          700: '#0b7a6a',
        },
        warning: {
          50:  '#f7c599',
          500: '#f79b79',
          700: '#b05e17',
        },
        error: {
          50:  '#F08080',
          500: '#ef4444',
          700: '#b91c1c',
        },
        dataViz: {
          primary:   '#266199',  
          secondary: '#3991d4',  
          positive:  '#1d9a88', 
          negative:  '#d65151',  
          alt:       '#714c9c',  
          highlight: '#f0d171',  
        }
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.275rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '1rem',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        xs:   '0.25rem',
        sm:   '0.5rem',
        md:   '1rem',
        lg:   '1.5rem',
        xl:   '2rem',
        '2xl':'3rem',
      },
    },
  },
  plugins: [],
};
