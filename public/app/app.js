angular
  .module("ResearchersApp", ["ngRoute"])
  .config(function ($httpProvider, $routeProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
    $routeProvider
    .when("/", {
      templateUrl: "app/views/researchers/researchers.html",
      controller: "ResearchersCtrl"
    })
    .when("/researchers", {
      templateUrl: "app/views/researchers/researchers.html",
      controller: "ResearchersCtrl"
    })
    .when("/universities", {
        templateUrl: "app/views/universities/universities.html",
        controller: "UniversitiesCtrl"
    })
    .otherwise({
      templateUrl: "app/views/researchers/researchers.html",
      controller: "ResearchersCtrl"
    })
  });