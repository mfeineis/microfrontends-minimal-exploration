const fs = require('fs');
const path = require('path');

const express = require('express');
const merge = require('webpack-merge');

const devConfig = ({ rootDir }) => ({
    devServer: {
        before(app) {
            // You might want to put your fragments behind a cache
            app.use('/counter', express.static(path.resolve(rootDir, 'counter')));
            app.use('/search', express.static(path.resolve(rootDir, 'search')));
            app.use('/shop', express.static(path.resolve(rootDir, 'shop')));
        },
        contentBase: path.resolve(rootDir, "./main"),
        port: 8081,
    },
    mode: 'development',
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
