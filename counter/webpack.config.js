const path = require("path");

module.exports = {
    entry: [
        path.resolve(__dirname, "./index.js"),
    ],
    module: {
        rules: [{
            exclude: [/elm-stuff/, /node_modules/],
            test: /\.elm$/,
            use: {
                loader: "elm-webpack-loader",
                options: {
                    cwd: path.resolve(__dirname, "./"),
                },
            },
        }],
    },
    output: {
        filename: "counter.js",
        path: path.resolve(__dirname, "./fragments"),
    },
};
