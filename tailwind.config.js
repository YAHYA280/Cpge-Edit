const { nextui } = require("@nextui-org/react");
import colors from 'tailwindcss/colors';
import { wedgesTW } from "@lemonsqueezy/wedges";


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // Path to Tremor module
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: "",
  theme: {
  	transparent: 'transparent',
  	current: 'currentColor',
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			tremor: {
  				brand: {
  					faint: 'colors.blue[50]',
  					muted: 'colors.blue[200]',
  					subtle: 'colors.blue[400]',
  					DEFAULT: 'colors.blue[500]',
  					emphasis: 'colors.blue[700]',
  					inverted: 'colors.white'
  				},
  				background: {
  					muted: 'colors.gray[50]',
  					subtle: 'colors.gray[100]',
  					DEFAULT: 'colors.gray[700]',
  					emphasis: 'colors.gray[700]'
  				},
  				border: {
  					DEFAULT: 'colors.gray[200]'
  				},
  				ring: {
  					DEFAULT: 'colors.gray[200]'
  				},
  				content: {
  					subtle: 'colors.gray[400]',
  					DEFAULT: 'colors.gray[500]',
  					emphasis: 'colors.white',
  					strong: 'colors.gray[900]',
  					inverted: 'colors.white'
  				}
  			},
  			'dark-tremor': {
  				brand: {
  					faint: '#0B1229',
  					muted: 'colors.blue[950]',
  					subtle: 'colors.blue[800]',
  					DEFAULT: 'colors.blue[500]',
  					emphasis: 'colors.blue[400]',
  					inverted: 'colors.blue[950]'
  				},
  				background: {
  					muted: '#131A2B',
  					subtle: 'colors.gray[800]',
  					DEFAULT: 'colors.gray[900]',
  					emphasis: 'colors.gray[300]'
  				},
  				border: {
  					DEFAULT: 'colors.gray[800]'
  				},
  				ring: {
  					DEFAULT: 'colors.gray[800]'
  				},
  				content: {
  					subtle: 'colors.gray[600]',
  					DEFAULT: 'colors.gray[500]',
  					emphasis: 'colors.gray[200]',
  					strong: 'colors.gray[50]',
  					inverted: 'colors.gray[950]'
  				}
  			},
  			border: '#80808024',
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
  			own_primary: {
  				'1': '#f5f501',
  				'2': '#a5a500'
  			},
  			light: {
  				'1': '#FFFFFF',
  				'2': '#F7F7F7',
  				'3': '#EDEFF3'
  			},
  			dark: {
  				'1': '#121417',
  				'2': '#191B1F',
  				'3': '#777f8159',
  				'4': '#1b1f23'
  			},
  			gray: {
  				'1': '#777F81'
  			},
  			link_color: {
  				'1': '#1d4ed8',
  				'2': '#1e40af'
  			},
  			text_color: {
  				'1': '#777F81'
  			}
  		},
  		boxShadow: {
  			'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  		},
  		borderRadius: {
  			'tremor-small': '0.375rem',
  			'tremor-default': '0.5rem',
  			'tremor-full': '9999px'
  		},
  		fontSize: {
  			'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
  			'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
  			'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
  			'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
  		},
  		keyframes: {
  			shine: {
  				'0%': {
  					'background-position': '100%'
  				},
  				'100%': {
  					'background-position': '-100%'
  				}
  			},
  			'star-movement-bottom': {
  				'0%': {
  					transform: 'translate(0%, 0%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translate(-100%, 0%)',
  					opacity: '0'
  				}
  			},
  			'star-movement-top': {
  				'0%': {
  					transform: 'translate(0%, 0%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translate(100%, 0%)',
  					opacity: '0'
  				}
  			},
  			accordionOpen: {
  				from: {
  					height: '0px'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			accordionClose: {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0px'
  				}
  			},
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
  			shine: 'shine 5s linear infinite',
  			'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
  			'star-movement-top': 'star-movement-top linear infinite alternate',
  			accordionOpen: 'accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)',
  			accordionClose: 'accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },

  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],


  plugins: [wedgesTW(), require('@headlessui/tailwindcss'), require("tailwindcss-animate"), nextui({
    themes: {
      light: {
        // ...
        colors: {
          background: "#FFFFFF", // or DEFAULT
          foreground: "#11181C", // or 50 to 900 DEFAULT
        },
      },
      dark: {
        // ...
        colors: {
          background: "#000000", // or DEFAULT
          foreground: "#ECEDEE", // or 50 to 900 DEFAULT
        },
      },
      // ... custom themes
    },
  })],
  // plugins: [require("tailwindcss-animate"), nextui()],
}