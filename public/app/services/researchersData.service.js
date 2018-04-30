angular
	.module("ResearchersApp")
  .service('researchersDataService', function () {
    var researchersData; // Stores researchers data from researchers view, to use them in graphs view

    function setResearchersData(data) {
      researchersData = data;
    }

    function getResearchersData() {
      return researchersData;
    }

    return {
      setResearchersData: setResearchersData,
      getResearchersData: getResearchersData
    }
  });