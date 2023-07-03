import {defineConfig} from 'vite'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import * as WPStrap from '@wp-strap/vite';

export default defineConfig(({command, mode}, core = {
    isDev: mode === 'development', /* Determines if we're running in dev mode */
    root: 'src',  /* Project root directory for Vite */
    outDir: `build`, /* Folder that contains our processed files */
    dirname: __dirname /* Absolute path to current dir */
}) => ({
    ...WPStrap.baseConfig(core), ...{

        /* ViteJS plugins */
        plugins: [WPStrap.viteHandleHotUpdate(), ViteImageOptimizer()],

        /* Build options */
        build: {
            ...WPStrap.baseConfig(core).build, ...{

                /* RollupJS options */
                rollupOptions: {
                    ...WPStrap.baseConfig(core).build.rollupOptions, ...{

                        /* RollupJS plugins */
                        plugins: [
                            WPStrap.rollupEncapsulateBundles(),
                            WPStrap.rollUpCopyAssets(),
                        ],
                    }
                },
            }
        },
    }
}));