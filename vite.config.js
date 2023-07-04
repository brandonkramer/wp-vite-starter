import {defineConfig} from 'vite'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import * as WPStrap from '@wp-strap/vite';

export default defineConfig({

    /**
     * Build options
     */
    build: {

        /**
         * RollupJS options
         */
        rollupOptions: {

            /**
             * RollupJS plugins
             */
            plugins: [

                /**
                 * Encapsulates JS bundles to prevent mix-up of
                 * global variables after minification
                 */
                WPStrap.rollupEncapsulateBundles(),

                /**
                 * Collects images, SVG and font files from
                 * folders and emits them
                 */
                WPStrap.rollUpCopyAssets()
            ],
        },
    },

    /**
     * ViteJS plugins
     */
    plugins: [

        /**
         * Extends a base config which is opinionated
         * and configured for WordPress development
         *
         * @see https://github.com/wp-strap/wp-vite-starter/#vitejs-config
         */
        WPStrap.viteConfigBase(),

        /**
         * Optimizes images and SVG files that we emit
         * using SVGO and Sharp.
         *
         * @see https://github.com/FatehAK/vite-plugin-image-optimizer
         */
        ViteImageOptimizer()
    ],
});