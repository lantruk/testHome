/*
//process.env.NODE_ENV = 'development';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const args = process.argv;
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client',
        "./develop/app"
    ],
 
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

    evtool: 'source-map',
 
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
  
        new webpack.ProvidePlugin({
            React: "react",
            utils: 'utils',
            lang: 'lang',
        })
    ]

}

    module.exports.plugins.push(
        new webpack.DefinePlugin({
            isHRM: true,
            'process.env.NODE_ENV': JSON.stringify('production')
                 })
    )

    module.exports.entry = [//Точка входа - точек входа может быть много
        "./develop/app"
    ]

    module.exports.output = { //Выход как и вход может быть несколько
        filename: 'D:/Projects/OneTrack-Web/static/mytrak/public/js/production.build-es5.min.js',
        path: path.resolve('./public/'),
        publicPath: '/static/mytrak/public/'
    }

    module.exports.module.loaders[0].loaders = ['babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0,presets[]=react-optimize,plugins=transform-runtime']


    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                dead_code: true
                //unsafe: true
            }
        })
    );*/
