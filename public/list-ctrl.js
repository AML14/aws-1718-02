angular
	.module("ResearchersListApp")
	.controller("ListCtrl", function ($scope, $http) {
		console.log("Controller initialized");
		function refresh() {
			$http.get("api/v1/researchers").then(function (response) {
				$scope.researchers = response.data;
			});
		}

		$scope.addResearcher = function () {
			$http
				.post("/api/v1/researchers", $scope.newResearcher)
				.then(function () {
					refresh();
				})
				.catch(function () {
					$('#errorResearchersModal').modal('show');
					console.log("Invalid ORCID");
				});
		}

		$scope.deleteResearcher = function (orcid) {
			var researcher = _.find($scope.researchers, {'ORCID': orcid});
			$http
				.delete("/api/v1/researchers/"+orcid)
				.then(function () {
					refresh();
				});
		}

		$scope.deleteAllResearchers = function () {
			$http
				.delete("/api/v1/researchers")
				.then(function () {
					refresh();
				});
		}

		$scope.modifyResearcher = function (orcid) {
			var researcher = _.find($scope.researchers, {'ORCID': orcid});
			delete researcher.ORCID;
			$http
				.put("/api/v1/researchers/"+orcid, researcher)
				.then(function () {
					refresh();
				});
		}

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

		refresh();

	});
