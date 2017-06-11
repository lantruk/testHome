process.env.NODE_ENV = 'development';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const args = process.argv;
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('process.env.NODE_ENV---', process.env.NODE_ENV)

module.exports = {
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client',
        "./develop/app"
    ],
    output: {
        filename: './js/develop.build-es5.js',
        path: path.resolve('./develop/'),
        publicPath: '/static/mytrak/develop/'
    },

    watch: false,

    watchOptions: {
        aggregateTimeout: 50
    },

    resolve: {
        modulesDirectories: ['node_modules', 'styles', 'develop'],
        extansions: ['', '.js', '.jsx', '.scss', '.css'],
        root: [path.resolve('./develop/')],
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extansions: ['', '.js']
    },

    devtool: 'source-map',
    //devtool: 'cheap-inline-module-source-map',
    //devtool: isProd ? null : 'source-map',

    module: {
        loaders: [
            {
                test: /\.js|\.jsx$/,
                exclude: /(node-modules|bower_components|vendor)/,
                include: [path.resolve(__dirname, "develop")],
                loaders: ['babel']
            }, {
                test: /(\.scss|\.css)$/,
                include: [path.resolve('develop')],
                loader: 'style!css!postcss!resolve-url!sass-loader?sourceMap'
                // loader: 'style!css?sourceMap&modules&!postcss!resolve-url!sass-loader?sourceMap',
                // loader: 'style!css!postcss-loader!sass'
                // loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap&modules&importLoaders=1&localIdentName=[local]!postcss!resolve-url!sass-loader?sourceMap')
                // loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass'

            }, {
                test: /\.(png|jpg|svg)$/,
                loader: 'file?name=img/[name].[ext]'
            }, {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file?name=fonts/[name]/[name].[ext]'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    },

    postcss: [autoprefixer({browsers: ['last 2 versions']})],

    sassLoader: {
        data: '@import "develop/styles/_global_config.scss";'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('./css/styles.css', {allChunks: true}),

        new webpack.DefinePlugin({
            //NODE_ENV: JSON.stringify(NODE_ENV)
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({
            React: "react",
            utils: 'utils',
            lang: 'lang',
        })
    ]

};