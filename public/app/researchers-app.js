angular
.module("ResearchersApp", [])
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});