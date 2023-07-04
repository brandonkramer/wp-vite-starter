/**
 * Tailwind Config
 */
module.exports = {

    /* The prefix option adds a custom prefix
     * to all of Tailwind’s generated utility classes
     *
     * @see https://tailwindcss.com/docs/configuration#prefix
    */
    prefix: 'wpv-',

    /**
     * This specifies the paths to look for
     * tailwind classes to optimise CSS code.
     *
     * @see https://tailwindcss.com/docs/content-configuration
     */
    content: [
        "./index.php",
        "./src/**/*.{js,ts,jsx,tsx,php}",
        "./templates/**/*.php ",
        "./inc/**/*.php",
    ],

    /**
     * The theme section of tailwind.config.js file
     * is where you define the project’s theming.
     *
     * @see https://tailwindcss.com/docs/theme
     */
    theme: {},

    /**
     * Extending Tailwind with third-party plugins.
     *
     * @see https://tailwindcss.com/docs/plugins
     */
    plugins: [],
}
