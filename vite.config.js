import {viteHandleHotUpdate, rollUpCopyAssets, rollupEncapsulateBundles} from '@wp-strap/vite'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import {defineConfig} from 'vite'
import * as esbuild from "esbuild";
import fg from "fast-glob";
import path from "path";

export default defineConfig(({command, mode}, core = {
    isDev: mode === 'development', /* Determines if we're running in dev mode */
    root: 'src',  /* Project root directory */
    outDir: `build`, /* Folder that contains our processed files */
}) => ({

    /* Shared options */
    root: core.root,
    server: {
        host: '0.0.0.0',
        port: 3000,
        watch: {usePolling: true}
    },
    css: {
        postcss: './postcss.config.js'
    },
    esbuild: {
        loader: 'jsx',
        include: /\/src\/.*\.js$/,
        exclude: []
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {'.js': 'jsx'}
        },
    },

    /* Build options */
    build: {
        manifest: true,
        target: 'es2015',
        minify: core.isDev ? false : 'esbuild',
        sourcemap: core.isDev,
        outDir: `../` + core.outDir,

        /* RollupJS options */
        rollupOptions: {
            input: fg.sync(path.resolve(__dirname, core.root, '*', '*.js')),
            output: {
                entryFileNames: (assetInfo) => 'js/[name].[hash].js',
                assetFileNames: (assetInfo) => assetInfo.name.split('.')[1] + '/[name].[hash][extname]',
            },

            /* RollupJS plugins */
            plugins: [
                rollupEncapsulateBundles(),
                rollUpCopyAssets(path.resolve(__dirname, core.root), {
                    rules: {
                        images: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
                        svg: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
                        fonts: /ttf|woff|woff2/i
                    }
                }),
            ],
        },
    },

    /* ViteJS plugins */
    plugins: [viteHandleHotUpdate(), ViteImageOptimizer()],
}));