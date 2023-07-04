module.exports = {

    /**
     * Some trickery can come when specifying the order that PostCSS plugins
     * run in. Some plugins are required to run before others will.
     */
    plugins: {
        /**
         * Can consume local files, node modules or web_modules. To resolve
         * path of an @import rule, it can look into root directory or local modules.
         *
         * @see https://github.com/postcss/postcss-import
         */
        'postcss-import': {},

        /**
         * This wraps postcss-nested or postcss-nesting and adds compatibility
         * for Tailwind functions
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
         * Plugin to parse CSS and add prefixes to CSS rules using values from
         * Can I Use. It is recommended by Google and used in Twitter and Alibaba.
         *
         * @see https://github.com/postcss/autoprefixer
         */
        autoprefixer: {},

        /**
         * Automatically detects and combines duplicated css selectors,
         * so you don't have to 😄
         *
         * @see https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors
         */
        'postcss-combine-duplicated-selectors': { removeDuplicatedValues: true }
    },
}