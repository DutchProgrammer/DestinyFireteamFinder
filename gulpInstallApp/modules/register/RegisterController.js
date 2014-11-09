
var RegisterController = ['$rootScope', '$scope', function ($rootScope, $scope) {
	$rootScope.loading = false;

	$scope.selectPlatform = function (platform) {
		$scope.selectedPlatform = platform;
	};

	$scope.submitForm = function (formController) {
		console.info(formController, 'formController');
		var emailAddress = formController.email.$modelValue;
		var password     = formController.password.$modelValue;

		$scope.errorMessage = '';
		$scope.errorType    = 'validation';
		if (!formController.$valid || !angular.isString(emailAddress) || !angular.isString(password) ) {
			$scope.errorMessage = 'Enter valid data please';
		} else {
			//socket.emit('requestLogin', { 'email' : emailAddress.toString(), 'password' : password.toString() });
			alert('verstuurd');
		}

	};
}];

angular.module('Destiny.app').controller('RegisterController', RegisterController);