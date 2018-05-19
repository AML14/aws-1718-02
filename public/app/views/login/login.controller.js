angular
	.module("ResearchersApp")
  .controller("LoginCtrl", LoginController);
  
  LoginController.$inject = ["$scope", "$window", "$location", "$rootScope"];

  function LoginController($scope, $window, $location, $rootScope) {

    var auth2;

    // Google sign in configuration
    var CLIENT_ID = '1044177619160-ojp05ob28ae05fofpi0fls1t8geoalv5.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyCFk6SLX4u0O7luRRpK5U-n8ez4Lm8OI74';
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    var SCOPES =
      'https://www.googleapis.com/auth/drive\
      https://www.googleapis.com/auth/drive.metadata.readonly\
      https://www.googleapis.com/auth/drive\
      https://www.googleapis.com/auth/drive.appdata\
      https://www.googleapis.com/auth/drive.file\
      https://www.googleapis.com/auth/drive.readonly\
      https://www.googleapis.com/auth/drive.scripts\
      https://www.googleapis.com/auth/drive.photos.readonly'
    var authorizeButton = document.getElementById('authorize-button');

    $window.appStart = function() {
      gapi.load('client:auth2', initSigninV2);
    };

    var initSigninV2 = function() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
        auth2 = gapi.auth2.getAuthInstance();
        // Listen for sign-in state changes.
        auth2.isSignedIn.listen(signinChanged);
        authorizeButton.onclick = handleAuthClick;
        if(auth2.isSignedIn.get() == true) {
          redirectToMainPage();
        }
      });
    };

    function handleAuthClick(event) {
      auth2.signIn();
    }

    var signinChanged = function(isSignedIn) {
      if(isSignedIn) {
        redirectToMainPage();
      }
    };

    function redirectToMainPage() {
      $rootScope.isAuthenticated = true;
      $scope.redirectMessage = "Redirecting to the main page..."
      $scope.$digest();
      setTimeout(function() {$window.location.href = "#!/researchers";}, 1500);
    }
  };
