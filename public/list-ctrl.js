  angular
      .module("ResearchersListApp")
      .controller("ListCtrl", function($scope, $http) {
          console.log("Controller initialized");
          function refresh (){
          $http.get("api/v1/researchers").then(function(response) {
            $scope.researchers = response.data;
          });
          }
          $scope.addResearcher = function(){
               $http
                .post("/api/v1/researchers", $scope.newResearcher)
                .then(function (){
                    refresh();  
                });
          }
          refresh();
      
          
      });
  