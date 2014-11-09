
var LoginController = ['$rootScope', '$scope', function ($rootScope, $scope) {
	$rootScope.loading = false;

	$scope.submitForm = function (formController) {
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

angular.module('Destiny.app').controller('LoginController', LoginController);