angular
	.module("ResearchersListApp")
	.controller("ListCtrl", function ($scope, $http) {
		console.log("Controller initialized");

		function refresh() {
			$http.get("api/v1/researchers?apikey="+$scope.apikey).then(function (response) {
				$scope.researchers = response.data;
				$scope.copyResearchers = angular.copy($scope.researchers);
			});
		}

		// API functions

		$scope.getResearchers = function () {
			$http.get("api/v1/researchers?apikey="+$scope.apikey).then(function (response) {
				$scope.researchers = response.data;
				$scope.copyResearchers = angular.copy($scope.researchers);
			});
		}

		$scope.getResearcher = function () {
			$http.get("api/v1/researchers/"+$scope.currentOrcid+"?apikey="+$scope.apikey).then(function (response) {
				$scope.researchers = [];
				$scope.researchers[0] = response.data;
				$scope.copyResearchers = angular.copy($scope.researchers);
			});
		}

		$scope.addResearcher = function () {
			$http
				.post("/api/v1/researchers?apikey="+$scope.apikey, $scope.newResearcher)
				.then(function () {
					refresh();
				})
				.catch(function () {
					$('#errorResearchersModal').modal('show');
					console.log("Invalid ORCID");
				});
		}

		$scope.modifyResearcher = function (orcid) {
			var researcher = _.find($scope.researchers, {'ORCID': orcid});
			delete researcher.ORCID;
			$http
				.put("/api/v1/researchers/"+orcid+"?apikey="+$scope.apikey, researcher)
				.then(function () {
					refresh();
				});
		}

		$scope.deleteResearcher = function (orcid) {
			var researcher = _.find($scope.researchers, {'ORCID': orcid});
			$http
				.delete("/api/v1/researchers/"+orcid+"?apikey="+$scope.apikey)
				.then(function () {
					refresh();
				});
		}

		$scope.deleteAllResearchers = function () {
			$http
				.delete("/api/v1/researchers?apikey="+$scope.apikey)
				.then(function () {
					refresh();
				});
		}

		// Auxiliary variables and functions to control UI

		$scope.showEditFields = false;
		$scope.toggleEditFields = function () {
			$scope.showEditFields = !$scope.showEditFields;
		};
		$scope.hideEditFields = function () {
			$scope.showEditFields = false;
		};

		$scope.closeAddResearcherModal = function () {
			$('#addResearcherModal').modal('hide');
		}

	});
