# Gulp Opencart 3.0.x Refresh

 Gulp Plugin for refresh OCMOD cache in OpenCart 3.0.x.


# Install

```
npm install gulp-opencart-refresh --save-dev
```
or

```
yarn add gulp-opencart-refresh
```
# Usage

```javascript

const gulp = require('gulp');
const ocRefresh = require('gulp-opencart-refresh');

gulp.task('ocRefresh', function(cb){
    ocRefresh({
        url: "URL",
        login: "LOGIN",
        password: "PASSWORD"
    });
    return cb();
});
