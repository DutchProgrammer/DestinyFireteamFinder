
var MainController = ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {

	$rootScope.signedIn = false;

	$rootScope.auth = {
		name: 'Danny van der Knaap'
	};

	//$rootScope.loading = true;
	// Set the loading variable
	// Set backButton to false
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		$rootScope.loading = true;
	});

	$rootScope.$on("$viewContentLoaded", function(event, next, current) {
		$scope.changePageClass();
	});

	//Set navigation menu
	$scope.navigationFiles = navigationFiles || [];
	
	// Set settings menu
	$scope.settingFiles = settingFiles || [];

	//Add current page class to ng-view
	$scope.changePageClass = function () {
	  var pagePrefix = 'page-';

	  //Replace old pagePrefix
	  $('ng-view').addClass(function (index, currentClass) {
	    var regx = new RegExp('\\b' + pagePrefix + '.*?\\b', 'g');
	    return currentClass.replace(regx, '');
	  });

	  var pageClass = pagePrefix+$location.path().split('/')[1];
	  
	  //Set new pageprefix
	  $('ng-view').addClass(pageClass);
	};

	function playSound() {

	  var snd = new Media('http://app.planning.nu/src/sound/beep.mp3', 
	    function (e) { alert('started');  }, 
	    function (error) {
	      alert('code: '    + error.code    + '\n' +
	            'message: ' + error.message + '\n');
	    }
	  );

	  snd.play({ playAudioWhenScreenIsLocked : true });
	  snd.setVolume('1.0');

	  return snd;
	};


	function notify() {

	  if ( typeof console == 'object') {
	      console.log.apply(console, arguments);
	  } else {
	      window.alert.apply(window, arguments);
	  }
	};

	function appAlert( content, callback, buttons, input) {
	  var content = (content === undefined || content === null ? '' : content);
	  var input   = (input === undefined   || input === null ? false : input);
	  var appDiv  = $('<div class="appAlert"></div>').appendTo('body');
	  var buttons = (buttons === undefined || buttons === null ? { 'ok' : 'Ok' }         : buttons);
	   
	  if (content !== '') {
	    $('<p>'+content+'</p>').appendTo(appDiv);
	  }   

	  if (input) {
	    $('<p>'+input+'</p>').appendTo(appDiv);
	  }
	  
	  $.each(buttons, function (k,v) {
	    $('<div class="button" button="'+(typeof k === 'string'  ? k : v)+'">'+v+'</div>')
	    .appendTo(appDiv)
	    .click(function () {
	      if (callback !== undefined && typeof callback === "function") {
	          
	        var inputVal = (input ? $(appDiv).find('input').val() : false);
	          
	        callback.apply(callback, [ $(this).attr('button'), appDiv, inputVal]);
	      }
	       
	      appDiv.remove();
	    });
	    
	  });
	   
	  return true;
	};

	function appConfirm(content, callback, buttons) {
	  var content = (content === undefined || content === null ? '' : content);
	  var buttons = (buttons === undefined || buttons === null ? { 'ok' : 'Ok', 'cancel' : 'Cancel' } : buttons);
	   
	   return  appAlert( content, callback, buttons);
	};

	function appPrompt(content, callback, buttons, input) {
	  var content = (content === undefined || content === null ? '' : content);
	  var buttons = (buttons === undefined || buttons === null ? { 'ok' : 'Ok', 'cancel' : 'Cancel' } : buttons);
	  var input   = (input === undefined   || input === null ? '<input type="text" name="confirm" inputField="confirm" />' : input);

	   return appAlert( content, callback, buttons, input);
	};


	document.addEventListener('deviceready', onDeviceReady);
	function onDeviceReady() {
		/*
		Clear cache is needed for android because it caches the app html.
		Side Effect if you clear cache it clear localstorage as well
		*/
		window.cache.clear( function(status) {
			notify('Message: ' + status);
		}, function(status) {
			notify('Error: ' + status);
		} );

		// Override default HTML alert,confirm, prompt with native dialog
		window.nativeAlert = window.alert;
		window.nativeConfirm = window.confirm;
		window.nativePrompt = window.prompt;
		window.alert = window.appAlert;
		window.confirm = window.appConfirm;
		window.prompt = window.appPrompt;

		//All binds http://docs.phonegap.com/en/2.5.0/cordova_events_events.md.html#menubutton
		//When device is going offline
		$(document).bind('offline', function () {
			notify('device offline');
			//app.checkConnection();
		});
		//When device is going online
		$(document).bind('online', function () {
			notify('device online');
			//app.checkConnection();
		});
		//When device is going resume
		$(document).bind('resume', function () {
			notify('device resume');
			//app.checkConnection();
		});
		//When device is going critical low on battery
		$(document).bind('batterycritical', function () {
			notify('device batterycritical');
		});
		//When device is going low on battery
		$(document).bind('batterylow', function () {
			notify('device batterylow');
		});
	};

}];

angular.module('Destiny.app').controller('MainController',MainController);