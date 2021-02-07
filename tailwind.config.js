const flatMap = require('lodash/flatMap')
const omit = require('lodash/omit')
const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // https://jeffjadulco.com/blog/dark-mode-react-tailwind/
      backgroundColor: {
        accent: "var(--color-accent)",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
      textColor: {
        accent: "var(--color-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        inverted: "var(--color-text-inverted)"
      },
      borderColor: {
        accent: "var(--color-accent)",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      }
    },
    colors: {
      ...colors,
      black: '#161925',
      transparent: 'transparent'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.text-container': {
          maxWidth: '100%',
          width: '100%',
          '@screen sm': {
            maxWidth: '640px'
          },
          '@screen md': {
            maxWidth: '768px'
          },
          '@screen lg': {
            maxWidth: '991px'
          },
          '@screen xl': {
            maxWidth: '1200px'
          }
        }
      })
    },
    // Currently not used
    // https://github.com/tailwindlabs/tailwindcss/pull/560#issuecomment-503222143
    function ({ addUtilities, e, theme, variants }) {
      const colors = flattenColorPalette(theme('borderColor'))

      const utilities = flatMap(omit(colors, 'default'), (value, modifier) => ({
        [`.${e(`border-t-${modifier}`)}`]: { borderTopColor: `${value}` },
        [`.${e(`border-r-${modifier}`)}`]: { borderRightColor: `${value}` },
        [`.${e(`border-b-${modifier}`)}`]: { borderBottomColor: `${value}` },
        [`.${e(`border-l-${modifier}`)}`]: { borderLeftColor: `${value}` },
      }))

      addUtilities(utilities, variants('borderColor'))
    },
  ],
}
