/**
 * PostCSS configurations
 * @see https://github.com/postcss/postcss#options
 */
module.exports = {
    /**
     * Specify the PostCSS plugins to use. Some trickery can come when specifying the order that
     * PostCSS plugins run in. Some plugins are required to run before others will work as intended.
     */
    plugins: {
        /**
         * This plugin can consume local files, node modules or web_modules. To resolve path of an @import rule, it
         * can look into root directory or local modules.
         * @see https://github.com/postcss/postcss-import
         */
        'postcss-import': {},

        /**
         * PostCSS plugin to unwrap nested rules closer to Sass syntax.
         * @see https://github.com/postcss/postcss-nested
         */
        'postcss-nested': {},

        /**
         * Plugin to parse CSS and add vendor prefixes to CSS rules using values from
         * Can I Use. It is recommended by Google and used in Twitter and Alibaba.
         * @see https://github.com/postcss/autoprefixer
         */
        autoprefixer: {},

        /**
         * Automatically detects and combines duplicated css selectors so you don't have to 😄
         * Needs to run after 'postcss-sort-media-queries'.
         * @see https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors
         */
        'postcss-combine-duplicated-selectors': { removeDuplicatedValues: true }
    },
}