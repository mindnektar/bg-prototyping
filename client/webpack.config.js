const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,

    entry: {
        app: ['@babel/polyfill', './script/app.jsx'],
    },

    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '',
        filename: 'script/[name].js',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            'script',
            'script/components/common',
            'script/components/ui',
            'script/components/hoc',
            'node_modules',
        ],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'webpack-import-glob-loader',
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-object-rest-spread',
                            ],
                        },
                    },
                ],
            },

            {
                test: /\.sass$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { url: false } },
                    { loader: 'sass-loader' },
                    { loader: 'import-glob-loader' },
                ],
            },

            {
                test: /\.obj$/,
                use: 'raw-loader',
            },
        ],
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
        inline: true,
        port: 9494,
        host: '0.0.0.0',
        disableHostCheck: true,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],

    devtool: 'cheap-module-eval-source-map',

    mode: 'development',
};
