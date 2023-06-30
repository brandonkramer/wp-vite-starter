# WP ViteJS 4 starter kit

[Vite](https://vitejs.dev) simple starter kit for WordPress plugin and theme development to make use of their lightweight, blazing fast and efficient development build tool. The "src" folder includes JS, PostCSS, images, fonts, SVG and a gutenberg block as examples.
## Usage

Install the packages and build our assets into the 'build' folder.
```
yarn install
yarn build
```

This will build the assets in dev mode. You can use the 'isDev' variable inside the ViteJS config to use a different configuration.
```
yarn build-dev
```

Builds assets in real-time and watches over files.
```
yarn watch
yarn watch-dev
```

Starts ViteJS dev server.
```
yarn start
```

## ViteJS Config
The config is configured to use esbuild for minification and turns off minification + includes a sourcemap when using the "-dev" commands. It also includes the following:
- PostCSS configuration
- Esbuild configuration to make ReactJS code work inside ".js" files instead of ".jsx"
- Custom RollupJS plugin that collects images, SVG and font files and emits them and makes them transformable
- Custom RollupJS plugin that encapsulates our JS bundles to prevent mix-up of global variables after minification
- Custom ViteJS plugin that updates/refreshes the dev server (HMR) when a change is made inside PHP files
- The Vite Image Optimizer plugin that optimizes images and SVG files that we emit

## PostCSS config

The PostCSS config includes the following plugins
- PostCSS import. 
- PostCSS nested to unwrap nested rules similar to SASS.
- Autoprefixer.
- PostCSS combine duplicated selectors that detects and combines duplicated CSS selectors.

## Other configurations
The idea here is to keep it simple so additional things can be added for different projects. Note that some hooking and functions are needed to make the ViteJS dev server work with your local environment and to enqueue assets based on the manifest file.