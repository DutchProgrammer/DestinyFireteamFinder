
var LoginController = ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
	$rootScope.loading = false;

	if ($rootScope.signedIn) {
		$location.path('/home');
		return;
	}

	$scope.submitForm = function (formController) {
		var emailAddress = formController.email.$modelValue;
		var password     = formController.password.$modelValue;

		$scope.errorMessage = '';
		$scope.errorType    = 'validation';

		if (!formController.$valid || !angular.isString(emailAddress) || !angular.isString(password) ) {
			$scope.errorMessage = 'Enter valid data please';
		} else {
			//socket.emit('requestLogin', { 'email' : emailAddress.toString(), 'password' : password.toString() });
			$rootScope.signedIn = true;
			$location.path('/home');
		}

	};
}];

angular.module('Destiny.app').controller('LoginController', LoginController);