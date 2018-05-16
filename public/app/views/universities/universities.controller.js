angular
	.module("ResearchersApp")
	.controller("UniversitiesCtrl", UniversitiesController);
	
	UniversitiesController.$inject = ["$scope", "$rootScope", "$http"];

	function UniversitiesController($scope, $rootScope, $http) {

		// API functions

		$scope.getUniversity = function () {
			$http.get("api/v1/universities/"+$scope.universityName)
				.then(function (response) {
					$scope.university = response.data;
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorUniversitiesModal').modal('show');
				});
		}
		
		// The following function calls the API and shows the modal on success
		$scope.getResearchGroupAndShowModal = function (researchGroup) {
			$http.get("api/v1/groups/"+researchGroup)
				.then(function (response) {
					$scope.selectedResearchGroup = response.data;
					$('#researchGroupModal').modal('show');
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorUniversitiesModal').modal('show');
				});
		}

		// The following function calls GDrive endpoint
		$scope.sendGoogleDriveData = function () {
			$http.post("api/v1/gdrive", $scope.university)
				.then(function (response) {
					
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorUniversitiesModal').modal('show');
				});
		}

		// Auxiliary variables
		// $rootScope.apikeyUniversities = '';
		$scope.universityName = '';
	};
