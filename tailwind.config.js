/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  // estados de hover só em aparelhos com mouse (evita hover "grudado" após um toque)
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tokens do redesign (definidos em src/index.css, claro e escuro)
        ground: token('ground'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        ink: token('ink'),
        'ink-soft': token('ink-soft'),
        brand: token('brand'),
        'brand-bright': token('brand-bright'),
        sand: token('sand'),
        'sand-ink': token('sand-ink'),
        field: token('field'),
        'field-deep': token('field-deep'),
        'on-field': token('on-field'),
        'on-field-soft': token('on-field-soft'),
        'on-field-accent': token('on-field-accent'),
        tile: token('tile'),
        card: token('card'),
        // Cores da logo, usadas nas interações e no movimento
        'logo-bright': token('logo-bright'),
        'logo-deep': token('logo-deep'),
        'logo-glow': token('logo-glow'),
        // Cores antigas, ainda usadas por componentes fora da página principal
        'lirge-cyan': '#22D3EE',
        'lirge-teal': '#0F766E',
        'lirge-dark': '#0D1117',
        'lirge-darker': '#0A0E13',
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Figtree', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Cinco degraus: small, body, lead, head, display
        small: ['var(--step-small)', { lineHeight: '1.5' }],
        body: ['var(--step-body)', { lineHeight: '1.6' }],
        lead: ['var(--step-lead)', { lineHeight: '1.45' }],
        head: ['var(--step-head)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        display: ['var(--step-display)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
      },
      maxWidth: {
        page: '84rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
