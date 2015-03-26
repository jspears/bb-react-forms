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

    app: './public/app.jsx',
    types:'./src/types',
    styles:'./src/styles'
}
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpack = require('webpack');
module.exports = {

    devtool: 'inline-source-map',

    entry: entry,

    output: {
        path: '.build',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '.build'
    },

    module: {
        loaders: [
            {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?experimental'},

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            { test: /\.woff(\d*)?$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },

    resolve: {
        alias: {
            'bb-react-forms': '../src/index',
            'types': '../src/types',
            'styles':'../src/styles'
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new ExtractTextPlugin("[name].css"),
        function() {
            this.plugin("done", function(stats) {
                stats = stats.toJson();
                console.error(JSON.stringify({
                    assetsByChunkName: stats.assetsByChunkName
                }));
            });
        }
    ]

};

