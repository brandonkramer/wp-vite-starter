module.exports = {
    /**
     * Specify the paths to all of our HTML templates, PHP/JavaScript code, and any other source
     * files that can contain Tailwind class names. This will make sure it generates
     * the styles that are needed.
     * @see https://tailwindcss.com/docs/content-configuration
     */
    content: [
        "./index.php",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./templates/**/*.php ",
        "./inc/**/*.php",
    ],

    /**
     * The theme section of tailwind.config.js file is where you define the project’s color
     * palette, type scale, fonts, breakpoints, border radius values, and more.
     * @see https://tailwindcss.com/docs/theme==
     */
    theme: {
        screens: {},
        extend: {
            fontSize: {},
            boxShadow: {},
            colors: {},
        }
    },

    /**
     * Extending Tailwind with reusable third-party plugins. Plugins let us register new styles
     * for Tailwind to inject into the user’s stylesheet using JavaScript instead of CSS.
     * @see https://tailwindcss.com/docs/plugins
     */
    plugins: [],
}
