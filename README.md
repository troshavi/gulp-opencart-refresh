# Gulp Opencart 3.0.x Refresh

 Gulp Plugin for refresh OCMOD cache in OpenCart 3.0.x.


# Install

```
npm install troshavi/gulp-opencart-refresh-v3 --save-dev
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
