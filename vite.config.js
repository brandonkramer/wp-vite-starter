import path from "path";
import {defineConfig} from 'vite'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import * as WPStrap from '@wp-strap/vite';

export default defineConfig(({command, mode}, core = {
    isDev: mode === 'development', /* Determines if we're running in dev mode */
    root: 'src',  /* Project root directory */
    outDir: `build`, /* Folder that contains our processed files */
    dirname: __dirname
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
                            WPStrap.rollUpCopyAssets(path.resolve(core.dirname, core.root), {
                                rules: {
                                    images: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
                                    svg: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
                                    fonts: /ttf|woff|woff2/i
                                }
                            }),
                        ],
                    }
                },
            }
        },
    }
}));