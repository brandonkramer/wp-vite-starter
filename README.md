<div align="center">
  <a href="https://vitejs.dev/">
    <img width="200" height="200" hspace="10" src="https://vitejs.dev/logo.svg" alt="vite logo" />
  </a>
  <h1>WP ViteJS 4 starter kit</h1>
  <p>
Simple lightweight starter kit to make use of Vite's blazing fast and efficient frontend build tool for WordPress plugin and theme development. The "src" folder includes JS, PostCSS, images, fonts, SVG and a gutenberg block as examples.

You can read more about ViteJS on [vitejs.dev](https://vitejs.dev)
</p>
</div>

---

## Quick start

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
The config file is extending a base config from `@wp-strap/vite` package which is opinionated and configured for WordPress development. This is set up to keep
the config file minimal and consistent. The base configurations can all be overwritten. The config currently includes the following:

- Esbuild for minification which is turned off with the `-dev` commands 
- Esbuild sourcemaps are added when using the `-dev` commands
- Esbuild is configured to make ReactJS code work inside `.js` files instead of `.jsx`
- Custom ViteJS plugin that updates/refreshes the dev server (HMR) when a change is made inside PHP files
- Custom RollupJS plugin that encapsulates our JS bundles to prevent mix-up of global variables after minification
- Custom RollupJS plugin that collects images, SVG and font files from folders and emits them to make them transformable by plugins
- [Vite Plugin Image Optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer) that optimizes images and SVG files that we emit

## PostCSS config

PostCSS is added through the Vite base config file and is currently configured with the following:
- [TailwindCSS](https://tailwindcss.com/docs/installation) to add a utility-first CSS framework that scans all of our files, and only generate styles and classes that we use.
- [TailwindCSS nesting](https://tailwindcss.com/docs/using-with-preprocessors#nesting) to unwrap nested rules similar to SASS.
- [PostCSS import](https://github.com/postcss/postcss-import) that can consume local files, node modules or web_modules using the `@import` rule.
- [Autoprefixer](https://github.com/postcss/autoprefixer) to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
- [PostCSS combine duplicated selectors](https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors) that detects and combines duplicated CSS selectors.

## TailwindCSS config
TailwindCSS is added through the PostCSS config file and is currently only configured with the following:
- Paths to find TailwindCSS classes for optimization. This will make sure it only generates styles that are needed.
- A prefix that will be added to all of Tailwind’s generated utility classes. This can be really useful to prevent naming conflicts with other themes and plugins. 

[Read here](https://tailwindcss.com/docs/configuration) more about all the cool stuff you can configure with Tailwind.

## PHP functions
... reserved

## Other ViteJS configurations

The idea here is to keep the starter kit simple so additional things can be added for different projects, and so it can be integrated into different theme and plugin structures/frameworks. The following things can also be configured:


- With the `WPStrap.rollUpCopyAssets` test rules you're able to add additional asset folders by adding additional test rules aside to images/svg/fonts, and you can customize the default ones as well
- You can customize the way it encapsulates bundles by adding an object as the first parameter in the `WPStrap.rollupEncapsulateBundles` function like so
```js
WPStrap.rollupEncapsulateBundles({
    banner: '/*My Custom Project*/(function(){', // Adds a comment before each bundle
    footer: '})();'
})
```
- with the `root` and `outDir` config variables you're able to change the source and build folders, name them differently or change the paths.
- Aside to `root` and `outDir` you can define and set an `entry` which will try to find asset files from this entry point in the `root` folder. For example if you set `root` to "src" and `entry` to "Static", you're able to maintain different bundles with a domain-specific source folder structure like so
```
my-custom-plugin/
├── src/                
│   ├── Blocks/            
│   │    └── Static     
│   │         ├── css/  
│   │         ├── js/  
│   │         └── images/  
│   ├── Admin/             
│   │    └── Static    
│   │         ├── css/  
│   │         ├── js/  
│   │         └── images/  
│   ├── Main/             
│   │    └── Static    
│   │         ├── css/  
│   │         ├── js/  
│   │         └── images/  
├── build/                  
│   ├── css/             
│   ├── js/              
│   ├── images/          


```