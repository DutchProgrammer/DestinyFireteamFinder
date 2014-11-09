
var MainController = ['$rootScope', '$scope', function ($rootScope, $scope) {
	//$rootScope.loading = true;
	// Set the loading variable
	// Set backButton to false
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		$rootScope.loading = true;
	});

	$rootScope.$on("$viewContentLoaded", function(event, next, current) {
		$scope.changePageClass();
	});
	//Add current page class to ng-view
	$scope.changePageClass = function () {
	  var pagePrefix = 'page-';

	  //Replace old pagePrefix
	  $('ng-view').addClass(function (index, currentClass) {

	  	alert(currentClass, 'currentClass');
	    var regx = new RegExp('\\b' + pagePrefix + '.*?\\b', 'g');

	  	alert(currentClass.replace(regx, ''), 'currentClass regx');
	    return currentClass.replace(regx, '');
	  });

	  var pageClass = pagePrefix+$location.path().split('/')[1];
	  
	  //Set new pageprefix
	  $('ng-view').addClass(pageClass);
	};


}];

angular.module('Destiny.app').controller('MainController',MainController);