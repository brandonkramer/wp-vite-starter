module.exports = {
    /**
     * The prefix option allows you to add a custom prefix to all of Tailwind’s generated utility
     * classes. This can be really useful to prevent naming conflicts with other themes and plugins.
     * @see https://tailwindcss.com/docs/configuration#prefix
     */
    prefix: 'wpv-',

    /**
     * Specify the paths to all of our HTML templates, PHP/JavaScript code, and any other source
     * files that can contain Tailwind class names. This will make sure it generates
     * the styles that are needed.
     * @see https://tailwindcss.com/docs/content-configuration
     */
    content: [
        "./index.php",
        "./src/**/*.{js,ts,jsx,tsx,php}",
        "./templates/**/*.php ",
        "./inc/**/*.php",
    ],

    /**
     * The theme section of tailwind.config.js file is where you define the project’s color
     * palette, type scale, fonts, breakpoints, border radius values, and more.
     * @see https://tailwindcss.com/docs/theme==
     */
    theme: {},

    /**
     * Extending Tailwind with reusable third-party plugins. Plugins let us register new styles
     * for Tailwind to inject into the user’s stylesheet using JavaScript instead of CSS.
     * @see https://tailwindcss.com/docs/plugins
     */
    plugins: [],
}
