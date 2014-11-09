var app = angular.module('Destiny.app', [
  "ngRoute",
  "ngTouch",
  'ngAnimate',
  'mobile-angular-ui',
]);


app.config(['$routeProvider', function ($routeProvider) {

  console.info(routeFiles, 'routeFiles');
  angular.forEach(routeFiles, function(route, routeUrl) {
    $routeProvider.when(routeUrl, route);
  });

  $routeProvider.otherwise({redirectTo: '/home'});

  // use the HTML5 History API (FOR google friendly URL)
  //http://scotch.io/quick-tips/js/angular/pretty-urls-in-angularjs-removing-the-hashtag
  //$locationProvider.html5Mode(true);
}]);