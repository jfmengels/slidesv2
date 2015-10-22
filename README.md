# Slides v2
[![Build Status](https://travis-ci.org/jfmengels/slidesv2.png)](https://travis-ci.org/jfmengels/slidesv2)
[![Dependencies Status](http://img.shields.io/david/jfmengels/slidesv2.svg?style=flat)](https://david-dm.org/jfmengels/slidesv2#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/jfmengels/slidesv2.svg?style=flat)](https://david-dm.org/jfmengels/slidesv2#info=devDependencies)
[![Coveralls branch](https://img.shields.io/coveralls/jfmengels/slidesv2/master.svg)](https://coveralls.io/github/jfmengels/slidesv2)

A proof of concept for slides with conditional paths.

## Tools
* [React](https://facebook.github.io/react) for rendering
* [Redux](https://github.com/rackt/redux) for a predictable app state (with [updeep](https://github.com/substantial/updeep) for immutable data)
* [Babel](http://babeljs.io) for ES201X code
* [Webpack](http://webpack.github.io) for building the project and for hotloading (serverside rendering coming soon)
* [CSS Modules](https://github.com/css-modules/css-modules) for styling
* [Mocha](https://github.com/mochajs/mocha) for testing
* [ESLint](http://eslint.org) for JavaScript code linting and some coding style checks

## Installation

Clone and setup the project this repository
```
git clone git+https://github.com/jfmengels/slidesv2.git
cd slidesv2
npm install
```

Run the project
```
npm start
```

You now have a server running on `http://localhost:3001`.
It should now watch the project front-end files, and hot-reload when possible.

## Features

### Redux

[Redux](https://github.com/rackt/redux) is based on the [Flux](https://facebook.github.io/flux) architecture proposed by Facebook. It is a leaner and simpler version of it, by removing some of the abstractions and making use of ideas from functional programming and [Elm](http://elm-lang.org), such as using pure functions for all data updates. The result is an immutable tree-like data structure, that can only be modified by specific pure functions, making it very easy to test and easy to trust. The data's immutability is not enforced by Redux out of the box, but it is in this project using [updeep](https://github.com/substantial/updeep).

### Hot-reload during development (using Webpack)

1. Run the project, open the website at `http://localhost:3001`
2. Changes the content of a css file, for example `public/client/routes/app/components/header.css` if you are on the root page
3. The page was magically updated without the page being reloaded.

Try the same thing with a js file. With a clean Redux data architecture, you can do actions that change the state of your store, then modify the reducers, and after hot-reloading, end up with the same store state as if the actions you had done were made with the updated reducers.
