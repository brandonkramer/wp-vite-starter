<div align="center">
  <a href="https://vitejs.dev/">
    <img width="200" height="200" hspace="10" src="https://vitejs.dev/logo.svg" alt="vite logo" />
  </a>
  <h1>WP ViteJS 4 starter kit</h1>
  <p>
Simple lightweight starter kit to make use of Vite's blazing fast and efficient frontend build tool for WordPress plugin and theme development. Comes with packages that provide front-end & back-end (PHP) utilities. The "src" folder includes JS, PostCSS, images, fonts, SVG and a gutenberg block as examples.

You can read more about ViteJS on [vitejs.dev](https://vitejs.dev)
</p>
</div>

---

## 📚 Table of contents
- [🏁 Quick start](#-quick-start)
- [💻 Other commands](#-other-commands)
- [📦 What's inside](#-whats-inside)
- [🚀 Setup Vite dev server](#-setup-vite-dev-server)
- [🎒 Other configurations](#-other-configurations)

## 🏁 Quick start

Install packages and autoloader.
```
yarn install
composer install
```

Build our assets into the 'build' folder.
```shell
yarn build
```

## 💻 Other commands

Build assets in dev mode. This is based off the 'development' mode in ViteJS.
Will turn off minification and add sourcemaps.
```shell
yarn build-dev
```

Builds assets in real-time and watches over files.
```shell
yarn watch
yarn watch-dev
```

Start ViteJS dev server.
```shell
yarn start
```

## 📦 What's inside
The idea here is to keep the starter kit simple so additional things can be added for different projects, and so it can be integrated into different theme and 
plugin structures and maintained through node/composer packages.

### ViteJS Config
The config is extending a base config from the `@wp-strap/vite` package through a plugin which is opinionated and configured for WordPress development. This is set up to keep
the config file minimal and consistent throughout different projects. The configurations can be overwritten. It currently includes the following:

- Esbuild for minification which is turned off for `-dev` commands 
- Esbuild sourcemaps are added when using `-dev` commands
- Esbuild is configured to make ReactJS code work inside `.js` files instead of the default `.jsx`
- JS entries are automatically included from first-level folders using fast-glob (e.g., js/my-script.js, blocks/my-block.js).
- CSS entries are also automatically included, bundled and compiled without importing them into JS files which is more suitable for WordPress projects.
- It will update/refresh the dev server (HMR/Hot Module Replacement) when a change is made inside PHP files
- It will encapsulate JS bundles to prevent mix-up of global variables after minification  
- It will collect images, SVG and font files from folders and emits them to make them transformable by plugins
- [Vite Plugin Image Optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer) is included that optimizes images and SVG files that we emit

### PostCSS config

PostCSS is added through the Vite base config file and is currently configured with the following:
- [TailwindCSS](https://tailwindcss.com/docs/installation) to add a utility-first CSS framework that scans all of our files, and only generate styles and classes that we use.
- [TailwindCSS nesting](https://tailwindcss.com/docs/using-with-preprocessors#nesting) to unwrap nested rules similar to SASS.
- [PostCSS import](https://github.com/postcss/postcss-import) that can consume local files, node modules or web_modules using the `@import` rule.
- [Autoprefixer](https://github.com/postcss/autoprefixer) to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
- [PostCSS combine duplicated selectors](https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors) that detects and combines duplicated CSS selectors.

### TailwindCSS config
TailwindCSS is added through the PostCSS config file and is currently only configured with the following:
- Paths to find TailwindCSS classes for optimization. This will make sure it only generates styles that are needed.
- A prefix that will be added to all of Tailwind’s generated utility classes. This can be really useful to prevent naming conflicts with other themes and plugins. 

[Read here](https://tailwindcss.com/docs/configuration) more about all the cool stuff you can configure with Tailwind.

### PHP / Composer
Composer includes the `wp-strap/vite` package that exposes some classes that helps you generate asset URLs from the manifest.json that you can register or enqueue. It also enables you to use HMR (hot module replacement) when the ViteJS dev server is running.

The classes follow PSR practices with interfaces, so it can be included trough OOP with dependency injection and IoC containers. It also provides a Facade class that allows you to use static methods anywhere you like if that's your jam.


Example with using the facade:
```php
use WPStrap\Vite\Assets;

// Resolves asset service instance and registers project configurations
Assets::register([
    'dir' => plugin_dir_path(__FILE__), // or get_stylesheet_directory() for themes
    'url' => plugins_url(\basename(__DIR__)) // or get_stylesheet_directory_uri() for themes
]);

// Listens to ViteJS dev server and makes adjustment to make HMR work
Assets::devServer()->start();

// returns: https://your-site.com/wp-content/plugins/your-plugin/build/js/main.oi4h32d.js
Assets::get('js/main.js') 

// Alternatively you can use these as well which will be more targeted to specific folders
// and for some of the methods you don't need to write the file extension
Assets::js('main') 
Assets::css('main') 
Assets::image('bird-on-black.jpg') 
Assets::svg('instagram') 
Assets::font('SourceSerif4Variable-Italic.ttf.woff2')

// Example of enqueuing the scripts
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('main', Assets::js('main'), []);
    wp_enqueue_style('main', Assets::css('main'), []);
});
```

Example with using instances 
```php
use WPStrap\Vite\Assets;
use WPStrap\Vite\AssetsService;
use WPStrap\Vite\DevServer;

// Instantiates the Asset service and registers project configurations
$assets = new AssetsService();
$assets->register([
    'dir' => plugin_dir_path(__FILE__), // or get_stylesheet_directory() for themes
    'url' => plugins_url(\basename(__DIR__)) // or get_stylesheet_directory_uri() for themes
]);

// Listens to ViteJS dev server and makes adjustment to make HMR work
(new DevServer($assets))->start();

$assets->get('js/main.js'); 
$assets->js('main') 
$assets->css('main') 
$assets->image('bird-on-black.jpg') 
$assets->svg('instagram') 
$assets->font('SourceSerif4Variable-Italic.ttf.woff2')

// You can also use the facade based on this instance.
Assets::setFacade($assets);
Assets::get('css/main.css');
```

Example with using instances wih functions
```php
use WPStrap\Vite\AssetsInterface;
use WPStrap\Vite\AssetsService;
use WPStrap\Vite\DevServer;

function assets(): AssetsInterface {
     static $assets;
     
     if(!isset($assets)) {
        $assets = (new AssetsService())->register([
            'dir' => plugin_dir_path(__FILE__), 
            'url' => plugins_url(\basename(__DIR__)) 
        ]);
     }
     
     return $assets;
}

(new DevServer(assets()))->start();


add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('main', assets()->js('main'), []);
    wp_enqueue_style('main', assets()->css('main'), []);
});
```

Example with using the League Container
```php
use League\Container\Container;
use WPStrap\Vite\Assets;
use WPStrap\Vite\AssetsInterface;
use WPStrap\Vite\AssetsService;
use WPStrap\Vite\DevServer;
use WPStrap\Vite\DevServerInterface;

$container = new Container();
$container->add(AssetsInterface::class)->setConcrete(AssetsService::class)->addMethodCall('register', [
    'dir' => plugin_dir_path(__FILE__), 
    'url' => plugins_url(\basename(__DIR__)) 
]);
$container->add(DevServerInterface::class)->setConcrete(DevServer::class)->addArgument(AssetsInterface::class);

$assets = $container->get(AssetsInterface::class);
$devServer = $container->get(DevServerInterface::class);

$devServer->start();

$assets->get('main/main.css');

// You can also set a PSR container as a facade accessor
Assets::setFacadeAccessor($container);
Assets::get('main/main.css')
```

### DevServer

`Assets::devServer()->start(3000');` OR `(new DevServer($assets))->start('3000');`

The dev server class is responsible for listening to the ViteJS dev server using CURL, checking if it's running locally on port 3000 which you can adjust using the optional param from the start() method as seen above.

If it can validate the dev server is running, it will inject viteJS scripts provided from the dev server, filter all asset urls and load source files instead (from the assets::get(), assets:css(), assets::js() etc. methods), 
and alter the script tags to make sure the source files can be loaded as modules for HMR.

**This should only be run on local/dev environments.** As it's using CURL on each request, so you don't want to run this on production.



## 🚀 Setup vite dev server


### Setting it up with DDEV

In this example we'll use DDEV as our local environment.  [You can read more about DDEV here](https://ddev.com/).

Within DDEV you need to make sure the port we'll use is being exposed and routed accordingly. We will be using port 3000 which is set by default in the ViteJS config. This can be done with this simple add-on: https://github.com/wp-strap/ddev-vite

Lets assume you already have installed DDEV on your computer and we're inside a folder called "wp-vite-playground".

You can bootstrap a new WP project with these combined commands:

```shell
mkdir wordpress
ddev config --docroot=wordpress --project-type=wordpress
ddev get wp-strap/ddev-vite
ddev start
ddev exec wp core download --path="wordpress"
ddev exec wp core install --path="wordpress" --title="WPVitePlayground" --admin_name="admin" --admin_password="password" --admin_email="admin@local.ddev" --url="https://wp-vite-playground.ddev.site"
```
This will:
- Set up and configure DDEV
- Add our simple add-on to it that expose the port we'll need
- Download WordPress and installs it for you with wp-vite-playground.ddev.site as domain and "admin" as login and "password" as pass.

You should be able to visit the site on https://wp-vite-playground.ddev.site

Or if you already have a DDEV server running you can do the following commands to install the add-on and restart the server
```shell
ddev get wp-strap/ddev-vite
ddev restart
```
Let's assume you've done the following:
- Git clone `wp-vite-starter` into `wordpress/wp-content/plugins` with the folder name `wp-vite-starter`
- Run the `yarn install`, `composer install` and `yarn build` commands to install all the packages and build + compile the example files from the repo
- Created a plugin file called wp-vite-starter.php in the plugin folder with the following basic contents: (and activated the plugin)

```php
<?php
/*
Plugin Name: WP Vite Starter
Description: Playground
Version: 1.0.0
*/

use WPStrap\Vite\Assets;

/**
 * Require composer autoloader.
 */
require 'vendor/autoload.php';


Assets::register([
    'dir' => plugin_dir_path(__FILE__),
    'url' => plugins_url(\basename(__DIR__))
]);

Assets::devServer()->start();

\add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('main', Assets::js('main'));
    wp_enqueue_style('main', Assets::css('main'));
});

```

You now need to spin up the Vite dev server using SSH so it runs on the local/docker environment using `ddev ssh`:
```shell
ddev ssh
 
cd wordpress/wp-content/plugins/wp-vite-starter

yarn install 
yarn start
```

Refresh the browser while you're on wp-vite-playground.ddev.site and you should be able to see a script on https://wp-vite-playground.ddev.site:3000/@vite/client

The `Assets::devServer()->start()` function will listen to this page and inject the scripts into the site. The dev server + HMR should be working now: If you make a change in src/css/main.pcss it should automatically inject the changes into the page without refreshing the page:

![hmr-gif](https://wpstrap.com/docs/git-vite-js-hmr.gif)

## 🎒 Other configurations

The following things can also be configured:

### Change rules for asset files that are copied

With the `userOptions.assets.rules` param you're able to add additional asset folders by adding additional test rules aside to images/svg/fonts, and you can customize the default ones as well:
```js
viteWPConfig({
    assets: {
        rules: {
            images: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
            svg: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
            fonts: /ttf|woff|woff2/i
        }
    }
})
```
### Customize header & footer of bundle encapsulation
You can customize the way it encapsulates bundles by using the `userOptions.bundles` param:
```js
viteWPConfig({
    bundles: {
        banner: '/*My Custom Project*/(function(){', // Adds a comment before each bundle
        footer: '})();'
    }
})
```
### Change src and build folders
With the `root` and `outDir` params you're able to change the source and build folders, name them differently or change the paths.
```js
viteWPConfig({
    root: 'assets',
    outDir: 'dist',
})
```
You will need to change these in the PHP register method as well.
```php
$assets->register([
    /* .... */
    'root' => 'assets', 
    'outDir' =>> 'dist'
]);
```

### Use an entry point and setup domain folder structure
Aside to `root` and `outDir` you can define and set an `entry` which will try to find asset files from this entry point inside the `root` folder. 
```js
viteWPConfig({
    root: 'src', 
    outDir: 'build', 
    entry: 'Static', // <-----
})
```
For example if you set `root` to "src" and `entry` to "Static" like the above, you're able to maintain different bundles within different domain folders and mix it up with PHP files:
```
my-custom-plugin/
├── src/                  
│   ├── Blocks/
│   │    ├── Blocks.php
│   │    └── Static/     
│   │         ├── css/  
│   │         ├── js/  
│   │         └── images/  
│   ├── Admin/             
│   │    ├── Admin.php
│   │    └── Static/
│   │         ├── css/  
│   │         ├── js/  
│   │         └── images/  
│   ├── Main/        
│   │    ├── Main.php     
│   │    └── Static/
│   │         ├── css/  
│   │         ├── js/  
│   │         └── images/  
├── build/                  
│   ├── css/             
│   ├── js/              
│   ├── images/          

```
when using this approach you can use the PHP asset functions a bit differently:
```php
// When you use the get method you need to call the whole path
Assets::get('Main/Static/js/main.js')

// When using these methods you are able to use the first param to point to the domain and second param to point to the file.
Assets::js('Blocks', 'example-block')
Assets::css('Main', 'main')
Assets::image('Admin', 'bird-on-black.jpg')
Assets::svg('Main', 'instagram')

$assets->js('Blocks', 'example-block')
$assets->css('Main', 'main')
$assets->image('Admin', 'bird-on-black.jpg')
$assets->svg('Main', 'instagram')
```
The entry is set to "Static" by default inside the php register method, when you want to name this differently, you need to configure it here as well.
```php
$assets->register([
      /* .... */
    'entry' =>> 'Assets'
]);
```
### External Dependencies
This is inspired by [kucrut](https://github.com/kucrut); If you have a JavaScript package that relies on WordPress modules, such as `@wordpress/i18n`, you have the option to define them as externals using the `rollup-plugin-external-globals` plugin and the `wpGlobals()` function

```shell
yarn add -D rollup-plugin-external-globals
```

```js
import wpGlobals from '@wp-strap/vite';
import externalGlobals from 'rollup-plugin-external-globals';

export default defineConfig({

    /* ViteJS plugins */
    plugins: [
        
        /* External globals */
        externalGlobals({
            ...wpGlobals(),
            ...{'some-registered-script-handle': 'GlobalVar'}
        })
    ],

});
```