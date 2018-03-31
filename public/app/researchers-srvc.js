angular
	.module("ResearchersApp")
  .factory('httpRequestInterceptor', function ($rootScope) {
    return {
      request: function (config) {
        config.headers['apikey'] = $rootScope.apikey;
        return config;
      }
    };
  })