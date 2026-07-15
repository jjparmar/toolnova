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
			sans: ['var(--font-outfit)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			heading: ['var(--font-syne)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace']
		},
  		fontSize: {
  			'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
  			'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
  			'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
  			'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
  			'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
  			'2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
  			'3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
  			'4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
  			'5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
  			'6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
  			'7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
  			'8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
  			'9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.06em' }],
  		},
  		animation: {
			'fade-in': 'fade-in 0.5s ease-out',
			'slide-up': 'slide-up 0.6s ease-out',
			'slide-down': 'slide-down 0.6s ease-out',
			'scale-in': 'scale-in 0.4s ease-out',
			'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
			'shimmer': 'shimmer 2s linear infinite',
			'float': 'float 3s ease-in-out infinite',
			'float-slow': 'float-slow 6s ease-in-out infinite',
			'gradient-shift': 'gradient-shift 3s ease infinite',
			'gradient-x': 'gradient-x 3s ease infinite',
			'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
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
				'50%': { transform: 'translateY(-10px)' },
			},
			'float-slow': {
				'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
				'33%': { transform: 'translateY(-15px) translateX(5px)' },
				'66%': { transform: 'translateY(-5px) translateX(-5px)' },
			},
			'gradient-x': {
				'0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
				'50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
			},
  		},
  		boxShadow: {
  			'premium': '0 4px 6px -1px hsl(var(--foreground) / 0.05), 0 2px 4px -2px hsl(var(--foreground) / 0.05), 0 0 0 1px hsl(var(--border))',
  			'premium-lg': '0 20px 25px -5px hsl(var(--foreground) / 0.05), 0 8px 10px -6px hsl(var(--foreground) / 0.05), 0 0 0 1px hsl(var(--border))',
  			'glow-sm': '0 0 20px hsl(var(--glow-color) / 0.3)',
  			'glow-md': '0 0 40px hsl(var(--glow-color) / 0.4)',
  			'glow-lg': '0 0 60px hsl(var(--glow-color) / 0.5)',
  			'inner-glow': 'inset 0 0 20px hsl(var(--primary) / 0.1)',
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'mesh': 'radial-gradient(at 40% 20%, hsl(262 83% 68% / 0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(199 89% 58% / 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(320 82% 68% / 0.12) 0px, transparent 50%)',
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

