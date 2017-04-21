const request = require('request');
const through = require('through2').obj;
const gutil = require('gulp-util');
const getQueryParam = require('get-query-param');

var options;

function getKey(){
    return new Promise((resolve, reject) => {
        var key;
        return request({
            url: options.url + '/admin/index.php?route=common/login',
            method: 'POST',
            form: {
                username: options.login,
                password: options.password
            }
        }).on('response', (response)=>{
            resolve(getQueryParam('token', response.headers.location));
        });
    });
}

function refreshCache(key){
    return new Promise((resolve, reject) => {
        request.get(options.url + '/admin/index.php?route=extension/modification/refresh&token=' + key)
        .on('response', (response)=>{
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
        .then((result)=>{
        })
        .catch((error)=>{
            console.log(error);
        });
    return through(function (file, encoding, callback) { });
}

module.exports = opencartRefresh;