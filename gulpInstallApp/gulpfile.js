var gulp      = require('gulp');
var concat    = require('gulp-concat');
var header    = require('gulp-header');
var rename    = require('gulp-rename');
var shell     = require('gulp-shell');
var connect   = require('gulp-connect');
var uglifyJS  = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var fs        = require('fs');
var util      = require('util');
var fs        = require('fs');
var util      = require('util');
var glob      = require("glob");
var extend    = require('node.extend');

var options    = { 'sync': true };

var jsFiles    = [];
var cssFiles   = [];
var routeFiles = {};


var getAllFiles = function (extension) {

  glob('./modules/*/*.'+extension, options, function (er, files) {

    if (er === null) {
      if (extension == 'js') {
        files.forEach(function (file, key) {
          if (file.indexOf('app.js') !== -1 ) {
            jsFiles.unshift(file);
          } else {
            jsFiles.push(file);
          }
        });

      } else {
        cssFiles = files;
      }
    }
  });
};

var getAllRoutes = function () {

  glob('./modules/*/route.js', options, function (er, files) {

    if (er === null) {
      
      files.forEach(function (file, key) {
        var newRoute = JSON.parse(fs.readFileSync(file));

        var templatePath = file.replace('route.js', '').replace('./', '');

        newRoute[0].templateUrl = templatePath+newRoute[0].templateUrl;

        routeFiles = extend(routeFiles, newRoute);
      });
    }
    console.info(er, 'er');
    console.info(files, 'files');
  });

};

getAllFiles('js');
getAllFiles('css');
getAllRoutes();

console.info(routeFiles, 'routeFiles');

var config = {
   vendor: {
      js: [
         './bower_components/angular/angular.js',
         './bower_components/angular-route/angular-route.js',
         './bower_components/angular-touch/angular-touch.js',
         './bower_components/angular-animate/angular-animate.js',
         './bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.js',
         './bower_components/jquery/dist/jquery.js',
      ],
      css: [
         './font-awesome/css/font-awesome.css',
         './bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css',
         './bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-hover.min.css',
         './bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-desktop.min.css',
      ]
   }
}

gulp.task('connect', function() {
  connect.server();
});

gulp.task('build-connect', ['build-main','connect']);

gulp.task('build-main-js', function () {
console.info(
       config.vendor.js
      .concat([
      ])
       .concat(jsFiles), 'jsFiles');

    return gulp.src(
       config.vendor.js
      .concat([
      ])
       .concat(jsFiles)
       )
      .pipe(concat('scripts.js'))
      .pipe(header('/** Created at ' + (new Date) + ' **/'))
      .pipe(header('var routeFiles = ' + JSON.stringify(routeFiles) + ';' + "\n"))
      .pipe(gulp.dest('js'))
      .pipe(concat('scripts.min.js'))
      .pipe(uglifyJS())
      .pipe(gulp.dest('js'))
      ;

});

gulp.task('build-main-css', function () {

console.info(
       config.vendor.css
       .concat(cssFiles), 'cssFiles');

    return gulp.src(
       config.vendor.css
       .concat(cssFiles)
    )
        .pipe(concat('styles.css'))
        .pipe(header('/** Created at ' + (new Date) + ' **/'))
        .pipe(gulp.dest('css'))
        .pipe(concat('styles.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css'))
    ;
})

gulp.task('build-bower',
   shell.task('bower install')
);

gulp.task('build-main', ['build-main-css','build-main-js'],
  shell.task('cp modules/main/main.html index.html')
);


gulp.task('build-phonegap', ['build-main'], shell.task([
   'mkdir -p ../www/',
   'cp index.html ../www/',
   'rsync -av config.xml ../www/',
   'rsync -av fonts ../www/',
   'rsync -av css ../www/',
   'rsync -av js ../www/',
   //'rsync -av sound ../www/',
   'rsync -av  modules ../www/',
   'cd ../ && phonegap remote build android'
]));

