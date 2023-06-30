import {defineConfig} from 'vite'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import * as esbuild from "esbuild";
import fg from "fast-glob";
import path from "path";
import fs from "fs";

export default defineConfig(({command, mode}, core = {
    isDev: process.env.APP_ENV === 'development', /* Determines if we're running in dev mode */
    root: 'src',  /* Project root directory */
    outDir: `build`, /* Folder that contains our processed files */
}) => ({
    /* Shared options */
    root: core.root,
    server: {
        host: '0.0.0.0',
        port: 3000,
        watch: {
            usePolling: true
        }
    },
    css: {
        postcss: './postcss.config.js'
    },
    esbuild: {
        loader: "jsx",
        include: /\/src\/.*\.js$/,
        exclude: []
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {".js": "jsx"}
        },
    },

    /* ViteJS plugins */
    plugins: [
        /**A custom ViteJS plugin that will automatically recompile the assets and refresh  your browser when editing PHP files.*/
        {
            name: "php",
            handleHotUpdate({file, server}) {
                if (file.endsWith(".php")) {
                    server.ws.send({type: "full-reload", path: "*"});
                }
            },
        },
        /* A ViteJS plugin that optimizes our images and svg files */
        ViteImageOptimizer()
    ],

    /* Build options */
    build: {
        manifest: true,
        target: 'es2015',
        minify: core.isDev ? false : 'esbuild',
        sourcemap: core.isDev,
        outDir: `../` + core.outDir,

        /* RollupJS options */
        rollupOptions: {
            input: fg.sync(path.resolve(__dirname, core.root + "/*/*.js")),
            output: {
                entryFileNames: (assetInfo) => 'js/[name].[hash].js',
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.')[1];
                    return /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)
                        ? 'images/[name][extname]'
                        : extType + '/[name].[hash][extname]';
                },
            },

            /* RollupJS plugins */
            plugins: [
                /* A custom RollUpJS plugin that encapsulate bundles */
                ({
                    name: 'banner',
                    enforce: 'post',
                    generateBundle(options, bundle) {
                        for (const module of Object.values(bundle)) {
                            if (module.type === 'chunk') {
                                module.code = '(function(){' + module.code + '})();'
                            }
                        }
                    }
                }),
                /* A custom RollUpJS plugin which will emit all our asset files */
                {
                    async buildStart() {
                        ((testRules, assets = {}) => {
                            for (const assetFolder of fg.sync(path.resolve(__dirname, core.root), {onlyFiles: false})) {
                                for (const [asset, test] of Object.entries(testRules)) {
                                    if (!(asset in assets)) {
                                        assets[asset] = [];
                                    }
                                    (assets[asset] = [...assets[asset], ...fg.sync(path.resolve(assetFolder, asset + '/**/*'))])
                                }
                            }

                            for (const [type, asset] of Object.entries(assets)) {
                                asset.map((asset) => {
                                    const file = asset.split('/' + type + '/')[1];
                                    const fileExt = file.split('.')[1];

                                    if (fileExt !== undefined && testRules[type] !== false && testRules[type].test(fileExt)) {

                                        this.emitFile({
                                            type: 'asset',
                                            fileName: type + '/' + file,
                                            source: fs.readFileSync(asset)
                                        });
                                    }
                                })
                            }
                        })({
                            images: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
                            svg: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
                            fonts: /ttf|woff|woff2/i
                        })
                    }
                },
            ],
        },
    },
}));