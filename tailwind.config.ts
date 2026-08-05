import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		screens: {
			'3xl': '1920px',
			'4xl': '2560px',
			'5xl': '3840px',
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				foreground: 'hsl(var(--success-foreground))'
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning))',
  				foreground: 'hsl(var(--warning-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			xl: 'calc(var(--radius) + 4px)',
  			'2xl': 'calc(var(--radius) + 8px)',
  			'3xl': 'calc(var(--radius) + 12px)'
  		},
  		fontFamily: {
			sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			heading: ['var(--font-pjs)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace']
		},
  		fontSize: {
  			'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
  			'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.005em' }],
  			'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
  			'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
  			'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
  			'2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
  			'3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
  			'4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
  			'5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
  			'6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.045em' }],
  			'7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
  			'8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
  			'9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.06em' }],
  		},
  		animation: {
			'fade-in': 'fade-in 0.3s ease-out forwards',
			'slide-up': 'slide-up 0.45s ease-out forwards',
			'slide-down': 'slide-down 0.3s ease-out forwards',
			'scale-in': 'scale-in 0.3s ease-out forwards',
			'reveal-up': 'reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
			'shimmer': 'shimmer-slide 2s linear infinite',
			'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
			'float': 'float 3s ease-in-out infinite',
			'float-slow': 'float-slow 6s ease-in-out infinite',
			'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
			'gradient-x': 'gradient-x 3s ease infinite',
			'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
			'spin-slow': 'spin-slow 12s linear infinite',
		},
  		keyframes: {
  			'pulse-slow': {
  				'0%, 100%': { opacity: '0.5' },
  				'50%': { opacity: '1' },
  			},
  			'spin-slow': {
  				'from': { transform: 'rotate(0deg)' },
  				'to': { transform: 'rotate(360deg)' },
  			},
  			'float': {
				'0%, 100%': { transform: 'translateY(0px)' },
				'50%': { transform: 'translateY(-6px)' },
			},
			'float-slow': {
				'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
				'33%': { transform: 'translateY(-8px) translateX(3px)' },
				'66%': { transform: 'translateY(-3px) translateX(-3px)' },
			},
			'gradient-x': {
				'0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
				'50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
			},
			'reveal-up': {
				'from': { opacity: '0', transform: 'translateY(20px)' },
				'to': { opacity: '1', transform: 'translateY(0)' },
			},
			'shimmer-slide': {
				'from': { transform: 'translateX(-100%)' },
				'to': { transform: 'translateX(100%)' },
			},
			'glow-pulse': {
				'0%, 100%': { opacity: '0.6' },
				'50%': { opacity: '1' },
			},
  		},
  		boxShadow: {
  			'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
  			'elevated': '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 0 0 1px hsl(var(--border) / 0.3)',
  			'floating': '0 16px 48px -12px rgba(0, 0, 0, 0.12)',
  			'premium': '0 4px 16px -4px rgba(0, 0, 0, 0.08)',
  			'premium-lg': '0 16px 48px -12px rgba(0, 0, 0, 0.12)',
  			'glow-sm': '0 0 15px -3px hsla(var(--glow-color) / 0.25)',
  			'glow-md': '0 0 30px -5px hsla(var(--glow-color) / 0.35)',
  			'glow-lg': '0 0 50px -5px hsla(var(--glow-color) / 0.5)',
  			'inner-glow': 'inset 0 0 20px hsl(var(--primary) / 0.08)',
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  		},
  		spacing: {
  			'18': '4.5rem',
  			'22': '5.5rem',
  			'26': '6.5rem',
  			'30': '7.5rem',
  			'34': '8.5rem',
  			'38': '9.5rem',
  			'42': '10.5rem',
  			'46': '11.5rem',
  			'50': '12.5rem',
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};
export default config;
