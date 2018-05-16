angular
	.module("ResearchersApp")
  .controller("LoginCtrl", LoginController);
  
  LoginController.$inject = ["$scope", "$window", "$location", "$rootScope"];

  function LoginController($scope, $window, $location, $rootScope) {

    var auth2;
    // Client ID and API key from the Developer Console
    var CLIENT_ID = '57266913333-1u7c3destpe7bio8ot8sns1s5qs7o44b.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyAdTWMB_AgbGwQH3M1GkvlKo0448LG7Ul8';
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES =
      'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.scripts https://www.googleapis.com/auth/drive.photos.readonly'
    var authorizeButton = document.getElementById('authorize-button');
    $window.appStart = function() {
      // if (!$rootScope.isAuthenticated) {
      //   gapi.signin2.render('my-signin2', {
      //     'scope': 'profile email',
      //     'width': 240,
      //     'height': 50,
      //     'longtitle': true,
      //     'theme': 'dark'
      //   });
      //   gapi.load('auth2', initSigninV2);
      // }
      gapi.load('client:auth2', initSigninV2);
      
    };

    var initSigninV2 = function() {
      // auth2 = gapi.auth2.getAuthInstance();
      // auth2.isSignedIn.listen(signinChanged);
      // if(auth2.isSignedIn.get() == true) {
      //   auth2.signIn();
      // }
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(signinChanged);
        // Handle the initial sign-in state.
        // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        // signoutButton.onclick = handleSignoutClick;
      });
    };

    function handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }

    var signinChanged = function(isSignedIn) {
      if(isSignedIn) {
        $rootScope.isAuthenticated = true;
        $scope.redirectMessage = "Redirecting to the main page..."
        $scope.$digest();
        setTimeout(function() {$window.location.href = "#!/researchers";}, 1500);
      }
    };
  };
