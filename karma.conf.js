var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'], //run in Chrome
        singleRun: true, //just run once by default
        frameworks: ['mocha'], //use the mocha test framework
        files: [
            'tests.webpack.jsx' //just load this file
        ],
        preprocessors: {
            'tests.webpack.jsx': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['dots'], //report results in this format
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map',

            entry: {
                app: './public/app.jsx'
            },

            stats: {
                colors: true,
                reasons: true
            },
            module: {
                loaders: [
                    {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?experimental'},
                    {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
                    {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
                    {
                        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&minetype=application/octet-stream"
                    },
                    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
                    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"},
                    {
                        test: /\.less$/,
                        loader: 'style!css!less-loader'
                    }
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
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('development')
                })]

        },
        webpackServer: {
            noInfo: true
        }
    });

};
