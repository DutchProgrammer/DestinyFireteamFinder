
var HomeController = ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {

	if (!$rootScope.signedIn) {
		$location.path('/login');
		return;
	}

	$rootScope.loading = false;
	
}];

angular.module('Destiny.app').controller('HomeController',HomeController);