var app = angular.module('Destiny.app', [
  "ngRoute",
  "ngTouch",
  'ngAnimate',
  'mobile-angular-ui',
]);


if (mainModule) {
  app.config(['$routeProvider', function ($routeProvider) {
    angular.forEach(mainModule.routes, function(value, key) {
      value.templateUrl = 'modules/' + value.templateUrl;

      $routeProvider.when(key.substr(1), value);
    });

    $routeProvider.otherwise({redirectTo: '/home'});

    // use the HTML5 History API (FOR google friendly URL)
    //http://scotch.io/quick-tips/js/angular/pretty-urls-in-angularjs-removing-the-hashtag
    //$locationProvider.html5Mode(true);
  }]);
} else {
  ///Something whent wrong
  ///window.error or throw exeption
}
