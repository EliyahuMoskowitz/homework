//import pathway from 'path';   SyntaxError: Cannot use import statement outside a module
const pathway = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: pathway.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(m4a|mp3)$/i,
                use: {
                    loader: 'fileloader'
                }
            }
        ]
    }
}