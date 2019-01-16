const path = require('path')
console.log( path.resolve(__dirname, 'src/components/connect'))
module.exports = {
    webpackConfig: {
        module: {
            rules: [
                // Babel loader, will use your project’s .babelrc
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
            ]
        },
    },
    context: {
        adss: 'adss',
        reactADSS: path.resolve(__dirname, 'src/components/connect')
    }
}