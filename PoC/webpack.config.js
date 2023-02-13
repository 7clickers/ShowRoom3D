const path = require('path');

module.exports = {
    entry: {
        index: './script/showroom_poc.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: { rules: [
        {
            test: /\.css/i,
            use: ['style-loader','css-loader'],
            
        }
    ] },
    plugins: [],
    devServer: {
        static: './',
        open: {
            app: {
                name: 'Google Chrome'
            }
        }
    },
    devtool: "source-map"
}