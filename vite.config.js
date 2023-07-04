import {defineConfig} from 'vite'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import * as WPStrap from '@wp-strap/vite';

export default defineConfig({

    /* ViteJS plugins */
    plugins: [WPStrap.viteConfigBase(), ViteImageOptimizer()],

    /* Build options */
    build: {

        /* RollupJS options */
        rollupOptions: {

            /* RollupJS plugins */
            plugins: [WPStrap.rollupEncapsulateBundles(), WPStrap.rollUpCopyAssets()],
        },
    },
});