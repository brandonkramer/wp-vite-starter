import {defineConfig} from 'vite'
import {viteWPConfig} from '@wp-strap/vite';
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';

export default defineConfig({

    /**
     * ViteJS plugins
     */
    plugins: [

        /**
         * Base config that includes configurations for
         * WP development and several custom plugins
         *
         * @see https://github.com/wp-strap/wp-vite-starter#vitejs-config
         */
        viteWPConfig(),

        /**
         * Optimizes images and SVG files that we emit
         * using SVGO and Sharp.
         *
         * @see https://github.com/FatehAK/vite-plugin-image-optimizer
         */
        ViteImageOptimizer()
    ],
});