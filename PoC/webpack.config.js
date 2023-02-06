const path = require('path');

module.exports = {
    entry: {
        index: './script/showroom_poc.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: { rules: [] },
    plugins: [],
    devServer: {
        static: './',
        open: true
    }
}