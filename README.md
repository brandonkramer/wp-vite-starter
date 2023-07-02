<div align="center">
  <a href="https://vitejs.dev/">
    <img width="200" height="200" hspace="10" src="https://vitejs.dev/logo.svg" alt="vite logo" />
  </a>
  <h1>WP ViteJS 4 starter kit</h1>
  <p>
Vite simple lightweight starter kit for WordPress plugin and theme development to make use of their blazing fast and efficient frontend build tool. The "src" folder includes JS, PostCSS, images, fonts, SVG and a gutenberg block as examples.

You can read more about ViteJS on [vitejs.dev](https://vitejs.dev)
</p>
</div>

## Usages

Install the packages and build our assets into the 'build' folder.
```
yarn install
yarn build
```

This will build the assets in dev mode. You can use the 'isDev' variable inside the ViteJS config to use different configurations.
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
The config is configured to use esbuild for minification and turns off minification + includes a sourcemap when using the `-dev` commands. It also includes the following:
- PostCSS configuration
- Esbuild configuration to make ReactJS code work inside `.js` files instead of `.jsx`
- Custom RollupJS plugin that collects images, SVG and font files and emits them and makes them transformable
- Custom RollupJS plugin that encapsulates our JS bundles to prevent mix-up of global variables after minification
- Custom ViteJS plugin that updates/refreshes the dev server (HMR) when a change is made inside PHP files
- [Vite Plugin Image Optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer) that optimizes images and SVG files that we emit

## PostCSS config

The PostCSS config includes the following plugins
- [TailwindCSS](https://tailwindcss.com/docs/installation) to add a utility-first CSS framework that scans all of our files, and only generate styles and classes that we use.
- [TailwindCSS nesting](https://tailwindcss.com/docs/using-with-preprocessors#nesting) to unwrap nested rules similar to SASS.
- [PostCSS import](https://github.com/postcss/postcss-import) that can consume local files, node modules or web_modules using the `@import` rule.
- [Autoprefixer](https://github.com/postcss/autoprefixer) to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
- [PostCSS combine duplicated selectors](https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors) that detects and combines duplicated CSS selectors.

## TailwindCSS config
TailwindCSS is added through the PostCSS config file. Currently only the paths are configured to find TailwindCSS classes for optimization.

## Other configurations
The idea here is to keep it simple so additional things can be added for different projects. Note that some hooking and functions are needed to make the ViteJS dev server work with your local environment and to enqueue assets based on the manifest file.