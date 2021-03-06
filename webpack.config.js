const path = require('path'),
    env = process.env.NODE_ENV,
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin")
// extractVendor = new ExtractTextPlugin('css/vendor.css'), // 抽取bootstrap和font-awesome公共样式
// extractStyle = new ExtractTextPlugin('css/style.css'); // 抽取自定义样式

module.exports = {
    entry: process.env.NODE_ENV === 'production' ? {
        index: path.join(__dirname, 'src/index.tsx'),
        page: path.join(__dirname, 'src/index.tsx'),
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-saga']
    } : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.join(__dirname, './src/index.tsx')
    ],
    output: {
        filename: 'static/[name].js',
        path: path.resolve(__dirname, './build'),
        publicPath: env === 'dev' ? '/' : '../',
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'reducers': path.resolve(__dirname, './src/reducers'),
            'actions': path.resolve(__dirname, './src/actions'),
            'sagas': path.resolve(__dirname, './src/sagas'),
            'constants': path.resolve(__dirname, './src/constants')
        }
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.less$/,
            use: env === 'dev' ? ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')({
                            browsers: [
                                'Android > 4',
                                'iOS > 8'
                            ]
                        })]
                    }
                }, 'less-loader']
                : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                browsers: [
                                    'Android > 4',
                                    'iOS > 8'
                                ]
                            })]
                        }
                    }, 'less-loader'],
                    publicPath: '/static'
                })
        }, {
            test: /\.scss/,
            use: env === 'dev' ? ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')({
                            browsers: [
                                'Android > 4',
                                'iOS > 8'
                            ]
                        })]
                    }
                }, 'sass-loader']
                : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                browsers: [
                                    'Android > 4',
                                    'iOS > 8'
                                ]
                            })]
                        }
                    }, 'sass-loader'],
                    publicPath: '/static'
                })
        }, {
            test: /\.(jpg|png)$/,
            use: [
                'url-loader?limit=10000&name=img/[name].[ext]'
            ]
        }, {
            test: /\.html$/,
            use: 'html-loader?interpolate=require'
        }, {
            test: /\.(js|ts)x?$/,
            loader: ['babel-loader', 'awesome-typescript-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            use: [
                'file-loader?name=fonts/[name].[ext]'
            ]
        }]
    },
    plugins: process.env.NODE_ENV === 'production' ? [

        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'static/index.html'
        }),
        new ExtractTextPlugin('static/[name].css'),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor", // 模块名
            filename: "static/vendor.js",
            minChunks: Infinity,
        }),
    ] : [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'static/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        hot: true,
        noInfo: false
    },
    // devtool: 'source-map',

};