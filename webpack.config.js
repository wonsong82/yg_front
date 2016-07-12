var webpack = require('webpack');
var path = require('path');
var ExtractText = require('extract-text-webpack-plugin');
var Strip = require('strip-loader');


////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Add entry paths and set output path
 */
var paths = {
  entries: [
    {app: './src/index.js'}
  ],
  output: path.join(__dirname, 'public')
};

var settings = {
  polyfill: false
};


// Should not touch from here
///////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Base Config
 */
var config = {
  entry: {},
  output: {
    path: paths.output,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new ExtractText('[name].css', {allChunks:true})
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        //loader: 'style!css?url=false!postcss!sass'
        loader: ExtractText.extract('css?url=false&sourceMap!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      },
      {
        test: /\.less$/,
        loader: ExtractText.extract('css?url=false&sourceMap!postcss!less?sourceMap')
      },
      {
        test: /\.styl$/,
        loader: ExtractText.extract('css?url=false&sourceMap!postcss!stylus')
      },
      {
        test: /\.css/,
        loader: ExtractText.extract('css?url=false&sourceMap!postcss')
        //loader: 'style!css?url=false'
      },
      {
        test: /\.jpg$/,
        loader: 'file'
      }
    ],
    noParse: [
      /\.min.js$/,
      /\.min.css$/
    ]
  },
  postcss: function(){
    return [require('precss'), require('autoprefixer')]
  }
};


// Read through paths, and add them into entry
paths.entries.forEach(function(e){
  for(var key in e){
    if(e.hasOwnProperty(key)){
      config.entry[key] = [e[key]];
    }
  }
});


// Set environment
var env = {};
(function(){
  var devServer=false, productionFlag=false;
  for(var i=0;i<process.argv.length;i++) {
    if(process.argv[i].indexOf('dev-server')!=-1) devServer = true;
    if(process.argv[i].indexOf('-p')!=-1) productionFlag = true;
  }
  env.development = devServer;
  env.production = !devServer && productionFlag;
  env.debug = !devServer && !productionFlag;
})();

if(settings.polyfill) {
  for (key in config.entry) {
    if (config.entry.hasOwnProperty(key)) {
      config.entry[key] = config.entry[key].concat([
        'babel-polyfill'
      ]);
    }
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
var key;

// PRODUCTION CONFIG
if(env.production){
  process.env.NODE_ENV = 'production';
  config.bail = true;
  config.debug  = false;
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]);
  config.module.loaders = config.module.loaders.concat([
    {
      test: /\.jsx?$/,
      loaders: [
        Strip.loader('debug', 'console.log'),
        'babel'
      ],
      exclude: /node_modules/
    }
  ]);
}

// DEBUG CONFIG
else if(env.debug){
  process.env.NODE_ENV = 'development';
  config.debug = true;
  config.devtool = 'inline-source-map';
  config.module.loaders = config.module.loaders.concat([
    {
      test: /\.jsx?$/,
      loaders: [
        'babel'
      ],
      exclude: /node_modules/
    }
  ]);
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin()
  ]);
}

// DEVELOPMENT CONFIG
else if(env.development){
  process.env.NODE_ENV = 'development';
  config.debug = true;
  for(key in config.entry){
    if(config.entry.hasOwnProperty(key)){
      config.entry[key] = config.entry[key].concat([
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server'
      ]);
    }
  }
  config.devtool = 'inline-source-map';
  config.module.loaders = config.module.loaders.concat([
    {
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }
  ]);
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]);
}

module.exports = config;