# Slides v2
A proof of concept for slides with conditional paths.

## Tools
* React for rendering
* CSS modules for styling
* Redux for data handling and storing (with updeep for immutable data)
* Babel for ES2015/2016 code
* Webpack for building the project and for hotloading

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

### Redux architecture

TODO

### Hot-reload during development (using Webpack)

1. Run the project, open the website at `http://localhost:3001`
2. Changes the content of a css file, for example  `public/client/routes/app/components/header.css` if you are on the root page
3. The page was magically updated without the page being reloaded.

Try the same thing with a js file. With a clean Redux data architecture, you can do actions that change the state of your store, then modify the reducers, and after hot-reloading, end up with the same store state as if the actions you had done were made with the updated reducers.
