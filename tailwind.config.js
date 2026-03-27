/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                shadow: 'var(--shadow)',
                accent: 'var(--shadow-accent)',
                inset: 'var(--inset)',
            },
            translate: {
                boxShadowX: 'var(--shadow-offset)',
                boxShadowY: 'var(--shadow-offset)',
                reverseBoxShadowX: 'calc(var(--shadow-offset) * -1)',
                reverseBoxShadowY: 'calc(var(--shadow-offset) * -1)',
            },
            fontFamily: {
                title: ["Sora", "sans-serif"],
                heading: ["Sora", "sans-serif"],
                base: ["Public Sans", "sans-serif"],
                sans: ["Public Sans", "sans-serif"],
                display: ["Syne", "sans-serif"],
                mono: ["Space Mono", "monospace"],
            },
            borderRadius: {
                base: 'var(--radius)',
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                violet: {
                    DEFAULT: 'hsl(var(--violet))',
                    light: 'hsl(var(--violet-light))',
                },
                mint: {
                    DEFAULT: 'hsl(var(--mint))',
                    light: 'hsl(var(--mint-light))',
                },
                yellow: 'hsl(var(--yellow))',
                coral: 'hsl(var(--coral))',
                cream: 'hsl(var(--cream))',
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
                    '1': 'var(--chart-1)',
                    '2': 'var(--chart-2)',
                    '3': 'var(--chart-3)',
                    '4': 'var(--chart-4)',
                    '5': 'var(--chart-5)'
                }
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}
