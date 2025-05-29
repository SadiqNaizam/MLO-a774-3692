import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	// darkMode: ["class"], // Removed as PRD does not specify dark mode
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--theme-sidebar))',
					foreground: 'hsl(var(--theme-sidebar-foreground))'
				},
        // PRD specific colors not fitting semantic slots
        'prd-accent-blue': '#299CDB', // Mapped to primary
        'prd-accent-green': '#0AB39C', // Mapped to accent
        'prd-accent-red': '#F06548', // Mapped to destructive
        'prd-primary-text': '#212529', // Mapped to foreground
        'prd-secondary-text': '#878A99', // Mapped to muted-foreground
        'prd-background': '#F3F3F9', // Mapped to background
        'prd-surface': '#FFFFFF', // Mapped to card/popover DEFAULT
        'prd-sidebar': '#E9EBEC', // Mapped to sidebar.DEFAULT
        chart: {
          'color-1': '#FFD700',
          'color-2': '#F39C12',
          'color-3': '#00A5FF',
          'color-4': '#28A745',
          'color-5': '#6F42C1',
        },
			},
			borderRadius: {
        // Default is 'rounded-md' (0.375rem) from PRD, which is assigned to --radius
        // 'lg' will use this --radius. 'rounded-lg' class will give 0.375rem.
				lg: 'var(--radius)', 
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
