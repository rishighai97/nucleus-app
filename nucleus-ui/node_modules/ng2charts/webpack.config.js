const helpers = require('./config/helpers'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    {
        CheckerPlugin,
        TsConfigPathsPlugin
    } = require('awesome-typescript-loader');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    entry: helpers.root('index.ts'),
    output: {
        path: helpers.root('bundles'),
        publicPath: '/',
        filename: 'core.umd.js',
        library: 'ng2charts',
        libraryTarget: 'umd'
    },
    externals: [/^\@angular\//, /^rxjs\//],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [helpers.root('node_modules')]
        }, {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            options: {
                declaration: false
            },
            exclude: [/\.spec\.ts$/]
        }]
    },

    plugins: [
        new CheckerPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src')
        ),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslintLoader: {
                    emitErrors: false,
                    failOnHint: false
                }
            }
        }),
        new CleanWebpackPlugin(['bundles'], {
            root: helpers.root(),
            verbose: false,
            dry: false
        })
    ]
};
