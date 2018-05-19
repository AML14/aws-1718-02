angular
	.module("ResearchersApp")
	.controller("UniversitiesCtrl", UniversitiesController);
	
	UniversitiesController.$inject = ["$scope", "$rootScope", "$http"];

	function UniversitiesController($scope, $rootScope, $http) {

		// API functions

		$scope.getUniversity = function () {
			$http.get("api/v1/universities/"+$scope.universityName+"?apikey=123456")
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
			var fileMetadata = {
				'name': 'universityData.txt',
				'mimeType': 'text/plain'
			};
			gapi.client.drive.files.create({
				resource: fileMetadata
			}).then(function(response) {
				$http.patch(
					'https://www.googleapis.com/upload/drive/v3/files/'+response.result.id+'?uploadType=media',
					"University: "+$scope.university.name+"\n"+
					"Address: "+$scope.university.address+", "+$scope.university.ZipCode+", "+$scope.university.city+"\n"+
					"Phone: "+$scope.university.phone+"\n"+
					"Fax: "+$scope.university.fax+"\n"+
					"Email: "+$scope.university.mail+"\n"+
					"Website: "+$scope.university.web+"\n"+
					"Research groups: "+$scope.university.groups,
					{
						headers: {
							'Authorization': 'Bearer ' + gapi.auth.getToken().access_token
						}
					}
				)
				.then(function (response) {
					$('#gDriveModal').modal('show');
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorUniversitiesModal').modal('show');
				});
			});
		}

		// Auxiliary variables
		$scope.universityName = '';
	};
