/**
 * PostCSS config
 */
module.exports = {

    plugins: {

        /**
         * Can consume local files, node modules or web_modules.
         *
         * @see https://github.com/postcss/postcss-import
         */
        'postcss-import': {},

        /**
         * This wraps postcss-nested or postcss-nesting and
         * adds compatibility for Tailwind functions
         *
         * @ee https://tailwindcss.com/docs/using-with-preprocessors#nesting
         */
        'tailwindcss/nesting': {},

        /**
         * Utility-first CSS framework that scans all of our files, and only
         * generate styles and classes that we use.
         *
         * @see https://tailwindcss.com/docs/installation
         */
        tailwindcss: { config: './tailwind.config.js' },

        /**
         * Plugin to parse CSS and add prefixes to CSS rules using
         * values from Can I Use.
         *
         * @see https://github.com/postcss/autoprefixer
         */
        autoprefixer: {},

        /**
         * Automatically detects and combines duplicated css
         * selectors so you don't have to 😄
         *
         * @see https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors
         */
        'postcss-combine-duplicated-selectors': { removeDuplicatedValues: true }
    },
}