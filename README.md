# Webpack Boilerplate #

This is a simple webpack boiler plate for es6(es2005), polyfill, react, sass, less, stylus, css.

### How do I get set up? ###

git clone this
```
#!bash
$ git clone https://wonsong82@bitbucket.org/wonsong82/webpack-boilerplate.git project-folder
```
  
install dependencies
```
#!bash
$ cd project-folder
$ npm install
```
  
edit webpack.config.js
add entry js(s) to entries list, then set output dir,
will transpile each entries into output dir with names defined in entries list
```
#!javascript
// webpack.config.js

var paths = {
  entries: [
    {name_1: 'src_path_1'},
    {name_2: 'src_path_2'},
    ...
  ],
  output: path.join(__dirname, 'output_dir')
},

var settings = {
  polyfill: false // set this true if you would like to use polyfill
}
```

### How to use ? ###
by using npm commands, this boilerplate will try to transpile the followings:
react, es6, polyfill, sass, less, stylus, css

this boilerplate comes with three different modes
```
#!bash
$ npm start
$ npm run build
$ npm run build:dev
```
**"npm start"**  
runs webpack-dev-server, auto-refresh on file changes, enable sourcemaps for js & css, react-hot-replace
each js and css can be accessible at "http://localhost:8080/[name].[js|css]"  
include that in your public index.html

**"npm run build"**  
transpile css & js once, doesn't comporess the sources, add sourcemaps, good for testing enviornment
each js and css can be accessible in public folder

  
**"npm run build:dev"**  
transpile css & js once, compress the sources, remove warmings, comments, console.logs, debug and doesn't include sourcemaps
each js and css can be accessible in public folder
  
 




