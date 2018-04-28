angular
.module("ResearchersApp", ["ngRoute"])
.config(function ($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
  $routeProvider
  .when("/", {
    templateUrl: "app/researchers/researchers.html",
    controller: "ResearchersCtrl"
  })
  .when("/researchers", {
    templateUrl: "app/researchers/researchers.html",
    controller: "ResearchersCtrl"
  })
  .when("/universities", {
      templateUrl: "app/universities/universities.html",
      controller: "UniversitiesCtrl"
  })
  .otherwise({
    templateUrl: "app/researchers/researchers.html",
    controller: "ResearchersCtrl"
  })
});