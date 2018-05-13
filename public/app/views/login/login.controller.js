angular
	.module("ResearchersApp")
  .controller("LoginCtrl", LoginController);
  
  LoginController.$inject = ["$scope", "$window", "$location", "$rootScope"];

  function LoginController($scope, $window, $location, $rootScope) {

    var auth2;

    $window.appStart = function() {
      if (!$rootScope.isAuthenticated) {
        gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark'
        });
        gapi.load('auth2', initSigninV2);
      }
    };

    var initSigninV2 = function() {
      auth2 = gapi.auth2.getAuthInstance();
      auth2.isSignedIn.listen(signinChanged);
      if(auth2.isSignedIn.get() == true) {
        auth2.signIn();
      }
    };

    var signinChanged = function(isSignedIn) {
      if(isSignedIn) {
        $rootScope.isAuthenticated = true;
        $scope.redirectMessage = "Redirecting to the main page..."
        $scope.$digest();
        setTimeout(function() {$window.location.href = "#!/researchers";}, 1500);
      }
    };
  };
