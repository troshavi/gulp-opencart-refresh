# Gulp Opencart 2.3.x Refresh

 Gulp Plugin for refresh OCMOD cache in OpenCart 2.3.x.


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

gulp.task('ocRefresh', function(){
	gulp.src(['./system/**/*.ocmod.xml', './catalog/view/theme/*/template/**/*.tpl'])
		.pipe(ocRefresh({
			url: "URL",
			login: "LOGIN",
			password: "PASSWORD"
		}));
});
