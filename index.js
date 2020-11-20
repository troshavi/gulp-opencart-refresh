const request = require('request'); //.defaults({'proxy':'http://127.0.0.1:8080'});
const through = require('through2').obj;
const gutil = require('gulp-util');
const getQueryParam = require('get-query-param');

let options;

function getKey() {
    return new Promise((resolve, reject) => {
        request({
            url: options.url + '/admin/index.php?route=common/login',
            method: 'POST',
            formData: {
                username: options.login,
                password: options.password
            }
        })
            .on('response', (response) => {
                resolve({
                    user_token: getQueryParam('user_token', response.headers.location),
                    cookie: response.headers['set-cookie']
                });
            });
    });
}

function refreshCache(sesion) {
    console.log(sesion);
    return new Promise((resolve, reject) => {
        request({
            url: options.url + '/admin/index.php?route=marketplace/modification/refresh&user_token=' + sesion.user_token,
            method: 'GET',
            headers: {
                'Cookie': sesion.cookie
            }
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
            const now = `[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] `;
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
