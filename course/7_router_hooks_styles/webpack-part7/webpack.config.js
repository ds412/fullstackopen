const path = require('path')
const webpack = require('webpack')

// webpack builds './build/main.js' from './src/index.js'
const config = (env, argv) => {

    // set different backends based on whether this is production or development mode
    console.log('argv.mode:', argv.mode)
    const backend_url = argv.mode === 'production'
        ? 'https://notes2023.fly.dev/api/notes'
        : 'http://localhost:3001/notes'

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        devtool: 'source-map',
        devServer: {
            static: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config
