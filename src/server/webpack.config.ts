const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const webpackConfig = {
    mode: 'development',
    entry: ['webpack-hot-middleware/client', './src/client/index'],
    devServer: {
        hot: true
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }
                ]
            }
            , {
                test: /\.(j|t)s(x)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                '@babel/preset-env',
                                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
                            ],
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            'react-hot-loader/babel',
                        ],
                    },
                },
            },
        ],
    },
    devtool: 'eval-source-map',
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('development')
        // }),
        new webpack.HotModuleReplacementPlugin()
    ]
}