# Orchard Development Theme

This project offers a useful starting point for developing a theme for Orchard. Use the source files in this project as the point of departure for an Orchard theme. The theme is full of useful goodies for automating development tasks and optimising the theme for deployment.

## Prerequisites

To work with this theme, you'll need to make sure you have the following tools.

### NodeJS

This project contains a handful of helpful NPM scripts to assist with developing & packaging the theme. To run these NPM scripts, you'll need [Node.JS](https://nodejs.org/) installed. We recommend installing the "Stable" version.

### Orchard 

An Orchard theme isn't useful without a version of Orchard to use it. Download the source files or production ready release from the Orchard website. Alternatively, use our [Orchard Development project](https://github.com/moov2/orchard-development), which assists with developing and deploying Orchard.

## Getting Started

[Download the source files](https://github.com/moov2/orchard-development-theme/archive/master.zip) into a directory named after your theme. It's not critical, but the `package.json` file should be modified to reflect your project.

Alternatively the theme could be added as sub module within the theme directory. Below is an example of the command that should be run.

    git submodule add git@github.com:moov2/orchard-development-theme.git themes/ThemeName
    git submodule update --init --recursive

## Pattern Library

In order to show different components available to the theme we're providing a pattern library. Currently the pattern library is using our [development pattern library](https://github.com/moov2/development-pattern-library), which is using [Fractal](https://fractal.build/) and it's included in the theme as a git submodule. When converting this theme to a bespoke theme, this submodule should be replaced with the git repository that contains the bespoke extension of development-pattern-library.

The stylesheet for this theme is generated using Sass styles from the pattern library. 

When creating a distributable version of the theme, the pattern library is compiled to HTML and included in the `PatternLibrary` directory of the distributable.

## Commands

### Develop

When building a theme for any CMS, you're mostly be working with CSS, JavaScript & HTML. It's common in modern web development to write front end code and then have your source files compiled into something that will be served to the browser. 

For CSS, this theme by default uses [Sass](http://sass-lang.com/), where [Webpack](https://webpack.js.org/) handles compilation from Sass to CSS. Webpack is configured to use [autoprefixer](https://github.com/postcss/autoprefixer) via [PostCSS](https://github.com/postcss/postcss) to automatically add vendor prefixes.

For JavaScript, this theme by default promotes writing modules with ES6 code. Webpack will compile modules into a single file (`bundle.js`) using `index.js` as an entry point. Webpack is configured to use [Babel](https://babeljs.io/) to transpile the JavaScript code to ensure browser compatibility.

When developing on the theme, run `npm run develop` before you get started. This script will setup Webpack to handle compilation of CSS & JavaScript, and also watch source files for any changes to trigger bundling. 

`npm run develop` will also set up development with the [pattern library](#PatternLibrary).

### Linting

Linting is used to help developers to write consistent and quality code. Currently, the theme is only set up to analyse the JavaScript using [Standard JS](https://standardjs.com/). 

Use `npm run lint` to lint the source files.

*Standard JS has plugins for a [whole host of text editors](https://standardjs.com/index.html#are-there-text-editor-plugins).*

### Testing

When writing new JavaScript modules, it's good practice to write tests. The theme is setup to use [Mocha](https://mochajs.org/) to write and execute JavaScript tests.

Use `npm run test` to run the JavaScript tests.

### Distributable

When deploying the theme it should be packaged using the distributable command. This command will create optimised bundles for the CSS & JavaScript and ensure only required theme files are deployed. The pattern library is exported to static HTML assets that are copied to the `/PatternLibrary` directory. This command will create a distributable version within the `/dist` directory.

Use `npm run dist` to create production ready version of theme.
