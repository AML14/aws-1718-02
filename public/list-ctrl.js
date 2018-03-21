angular
	.module("ResearchersListApp")
	.controller("ListCtrl", function ($scope, $http) {
		console.log("Controller initialized");
		function refresh() {
			$http.get("api/v1/researchers").then(function (response) {
				$scope.researchers = response.data;
				// console.log($scope.researchers.length);
				// $scope.showsEditFields = new Array(60);
				// console.log($scope.showsEditFields);
				// $scope.showsEditFields.fill(false);
				// console.log($scope.showsEditFields);
			});
		}
		$scope.addResearcher = function () {
			$http
				.post("/api/v1/researchers", $scope.newResearcher)
				.then(function () {
					refresh();
				});
		}

		$scope.showEditFields = false;
		$scope.toggleEditFields = function () {
			$scope.showEditFields = !$scope.showEditFields;
		};

		refresh();

	});
