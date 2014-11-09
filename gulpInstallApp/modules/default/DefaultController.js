
var DefaultController = ['$rootScope', '$scope', function ($rootScope, $scope) {
	$rootScope.loading = false;

}];

angular.module('Destiny.app').controller('DefaultController',DefaultController);