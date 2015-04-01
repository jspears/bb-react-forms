var fs = require('fs');
var path = require('path');

/*
 function isDirectory(dir) {
 return fs.lstatSync(dir).isDirectory();
 }
 var entry = fs.readdirSync(path.join('.', 'src')).reduce(function (entries, dir) {
 var isDraft = dir.charAt(0) === '_';

 if (!isDraft && isDirectory(path.join('./src', dir)))
 entries[dir] = path.join(__dirname, dir, 'index.js');

 return entries;
 }, {
 app: './public/app.jsx'
 });
 console.log(entry);*/
var entry = {

    app: './public/app.jsx'
  //  types: './src/types',
  //  styles: './src/styles'
}
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpack = require('webpack');
var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

module.exports = {

    devtool: 'inline-source-map',

    entry: entry,

    output: {
        path: '.build/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        loaders: [
            {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?experimental'},
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
//            / Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
// loads bootstrap's css.
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"},
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!' + AUTOPREFIXER_LOADER
            },
            {
                test: /\.less$/,
                loader: 'style!css!less-loader'
            },
        ]
    },

    resolve: {
        alias: {
            'bb-react-forms': '../src/index',
            'types': '../src/types',
            'styles': '../src/styles'
        }
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new ExtractTextPlugin(".build/[name].css"),
        function () {
            this.plugin("done", function (stats) {
                stats = stats.toJson();
                console.error(JSON.stringify({
                    assetsByChunkName: stats.assetsByChunkName
                }));
            });
        }
    ]

};

