angular
  .module("ResearchersApp", ["ngRoute"])
  .config(function ($httpProvider, $routeProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
    $routeProvider
    .when("/", {
      templateUrl: "app/views/researchers/researchers.html",
      controller: "ResearchersCtrl",
      resolve: {
        checkLogin: checkLogin
      }
    })
    .when("/researchers", {
      templateUrl: "app/views/researchers/researchers.html",
      controller: "ResearchersCtrl",
      resolve: {
        checkLogin: checkLogin
      }
    })
    .when("/login", {
      templateUrl: "app/views/login/login.html",
      controller: "LoginCtrl",
      resolve: {
        redirectIfAuthenticated: function($rootScope, $location) {
          if($rootScope.isAuthenticated) {
            $location.path('/');
          }
        }
      }
    })
    .when("/universities", {
        templateUrl: "app/views/universities/universities.html",
        controller: "UniversitiesCtrl",
        resolve: {
          checkLogin: checkLogin
        }
    })
    .when("/departments", {
      templateUrl: "app/views/departments/departments.html",
      controller: "DepartmentsCtrl",
      resolve: {
        checkLogin: checkLogin
      }
    })
    .when("/graphs", {
      templateUrl: "app/views/graphs/graphs.html",
      controller: "GraphsCtrl",
      resolve: {
        checkLogin: checkLogin
      }
    })
    .otherwise({
      templateUrl: "app/views/researchers/researchers.html",
      controller: "ResearchersCtrl",
      resolve: {
        checkLogin: checkLogin
      }
    })

    function checkLogin($rootScope, $location) {   
      if(!$rootScope.isAuthenticated) { 
        $location.path('/login');
      }
    }
  });