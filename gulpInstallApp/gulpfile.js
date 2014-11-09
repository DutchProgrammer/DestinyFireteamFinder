var gulp      = require('gulp');
var concat    = require('gulp-concat');
var header    = require('gulp-header');
var rename    = require('gulp-rename');
var shell     = require('gulp-shell');
var connect   = require('gulp-connect');
var uglifyJS  = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var fs          = require('fs');
var util        = require('util');
var fs          = require('fs');
var util        = require('util');
var glob        = require("glob");
var objectMerge = require('object-merge');
var extend      = require('node.extend');

var options    = { 'sync': true };

var jsFiles         = [];
var cssFiles        = [];
var routeFiles      = {};
var navigationFiles = {};
var settingFiles    = {};
var navigationOrder = JSON.parse(fs.readFileSync('./modules/main/navigationOrder.js'));
var settingsOrder   = JSON.parse(fs.readFileSync('./modules/main/settingsOrder.js'));

var getAllFiles = function (extension) {

  glob('./modules/*/*.'+extension, options, function (er, files) {

    if (er === null) {
      if (extension == 'js') {
        files.forEach(function (file, key) {

          console.info(file, 'file');
          if (file.indexOf('/default/') !== -1 ) {
            return;
          }
          if (file.indexOf('route.js') !== -1 ) {
            return;
          }
          if (file.indexOf('navigation.js') !== -1 ) {
            return;
          }
          if (file.indexOf('setting.js') !== -1 ) {
            return;
          }
          if (file.indexOf('main/navigationOrder.js') !== -1 || file.indexOf('main/settingsOrder.js') !== -1 ) {
            return;
          }

        console.info(file, 'js file');
          if (file.indexOf('app.js') !== -1 ) {
            jsFiles.unshift(file);
          } else {
            jsFiles.push(file);
          }
        });

      } else {
        files.forEach(function (file, key) {
          if (file.indexOf('/default/') !== -1 ) {
            return;
          }
        console.info(file, 'css file');

          if (file.indexOf('/default-theme/') !== -1 ) {
            cssFiles.unshift(file);
          } else {
            cssFiles.push(file);
          }
        });
      }
    }
  });
};

//Merge all route files to one array
var getAllRoutes = function () {

  glob('./modules/*/route.js', options, function (er, files) {

    if (er === null) {
      
      files.forEach(function (file, key) {

        //Skip default module
        if (file.indexOf('/default/') !== -1 ) {
          return;
        }

        var newRoute = JSON.parse(fs.readFileSync(file));

        var templatePath = file.replace('route.js', '').replace('./', '');

        newRoute[0].templateUrl = templatePath+newRoute[0].templateUrl;

        var saveRoute = {};

        saveRoute[newRoute[0].url] = {"controller" : newRoute[0].controller, "templateUrl" : newRoute[0].templateUrl};

        console.info(saveRoute, 'saveRoute');

        routeFiles = extend(routeFiles, saveRoute);
      });
    }
  });

};

//Merge all navigation files to one array
var getAllNavigationItems = function () {

  glob('./modules/*/navigation.js', options, function (er, files) {

    if (er === null) {
      
      files.forEach(function (file, key) {
        //Skip default module
        if (file.indexOf('/default/') !== -1 ) {
          return;
        }

        var newNavigation = JSON.parse(fs.readFileSync(file));

        navigationFiles = extend(navigationFiles, newNavigation);
      });
    }
  });

};

//Merge all setting files to one array
var getAllSettingItems = function () {

  glob('./modules/*/setting.js', options, function (er, files) {

    if (er === null) {
      
      files.forEach(function (file, key) {
        //Skip default module
        if (file.indexOf('/default/') !== -1 ) {
          return;
        }

        var newSetting = JSON.parse(fs.readFileSync(file));

        settingFiles = extend(settingFiles, newSetting);
      });
    }
  });

};

var setNavigationOrder = function () {
  var newMenuOrder = [];


  navigationOrder.forEach(function(nav, key) {

    if (navigationFiles[nav] !== undefined) {
      newMenuOrder.push(navigationFiles[nav]);
    }
  });

  navigationFiles = newMenuOrder;
};

var setSettingOrder = function () {
  var newMenuOrder = [];

  settingsOrder.forEach(function(nav, key) {

    if (settingFiles[nav] !== undefined) {
      newMenuOrder.push(settingFiles[nav]);
    }
  });

  settingFiles = newMenuOrder;
};

getAllFiles('js');
getAllFiles('css');
getAllRoutes();
getAllNavigationItems();
getAllSettingItems();

setNavigationOrder();
setSettingOrder();

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
      .pipe(header('var navigationFiles = ' + JSON.stringify(navigationFiles) + ';' + "\n"))
      .pipe(header('var settingFiles = ' + JSON.stringify(settingFiles) + ';' + "\n"))
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

