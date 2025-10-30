/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                shadow: 'var(--shadow)',
            },
            fontFamily: {
                sans: [
                    'Poppins',
                    'ui-sans-serif',
                    'system-ui'
                ]
            },
            borderRadius: {
                base: 'var(--radius)',
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                main: {
                    DEFAULT: 'hsl(var(--main))',
                    foreground: 'hsl(var(--main-foreground))'
                },
                gradient: {
                    from: '#9890e3',
                    to: '#b1f4cf'
                },
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
                    foreground: 'hsl(var(--secondary-foreground))',
                    background: 'hsl(var(--secondary-background))'
                },
                overlay: {
                    DEFAULT: 'hsl(var(--overlay))'
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
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}

