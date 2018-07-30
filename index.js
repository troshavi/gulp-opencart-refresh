const request = require('request');
const through = require('through2').obj;
const gutil = require('gulp-util');
const getQueryParam = require('get-query-param');

let options;

function getKey() {
    return new Promise((resolve, reject) => {
        var key;
        request({
            url: options.url + '/admin/index.php?route=common/login',
            method: 'POST',
            form: {
                username: options.login,
                password: options.password
            }
        })
            .on('response', (response) => {
                resolve(getQueryParam('token', response.headers.location));
            });
    });
}

function refreshCache(key) {
    return new Promise((resolve, reject) => {
        request({
            url: options.url + '/admin/index.php?route=extension/modification/refresh&token=' + key,
            method: 'GET'
        })
            .on('response', (response) => {
                resolve(true);
            });
    });
}

function opencartRefresh(setting) {
    if (!setting.url) {
        throw new gutil.PluginError('gulp-opencart-refresh', '`url` is required!');
    }
    if (!setting.login) {
        throw new gutil.PluginError('gulp-opencart-refresh', '`login` is required!');
    }
    if (!setting.password) {
        throw new gutil.PluginError('gulp-opencart-refresh', '`password` is required!');
    }
    options = setting;
    getKey()
        .then(refreshCache)
        .then((result) => {
            const time = new Date();
            const now = `[${time.getHours}:${time.getMinutes}:${time.setSeconds}] `;
            (result) ? console.log(now + 'Cache was cleared') : console.log(now + 'Something wrong');
        })
        .catch((error) => {
            console.log(error);
        });
    return through(function (file, encoding, callback) {
        callback(null, file);
    });
}

module.exports = opencartRefresh;