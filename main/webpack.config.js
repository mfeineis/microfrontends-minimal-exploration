const fs = require('fs');
const path = require('path');

const express = require('express');
const merge = require('webpack-merge');

const devConfig = ({ rootDir }) => ({
    devServer: {
        before(app) {
            app.use('/shop', express.static(path.resolve(rootDir, 'shop')));
        },
        //compress: true,
        contentBase: path.resolve(rootDir, "./main"),
        //host: "0.0.0.0",
        port: 8081,
    },
    mode: 'development',
    //proxy: {
    //    "/api": "http://localhost:3000"
    //},
});

module.exports = (env = {}, argv = {}) => {

    const settings = {
        rootDir: path.resolve(__dirname, '..'),
    };

    console.log('webpack.settings', settings);

    const use = layer => layer(settings, env, argv);

    const appConfig = merge.smart(
        use(devConfig)
    );

    console.log('webpack.config', appConfig);

    return appConfig;
};
