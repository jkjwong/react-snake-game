const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/Main.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        historyApiFallback: true // Allows React Router routes to be resolved in dev mode. In production, should rewrite on server to redirect to root /. https://github.com/remix-run/react-router/blob/v2.3.0/docs/guides/Histories.md#browserhistory
    }
}