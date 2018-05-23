angular
	.module("ResearchersApp")
  .controller("GraphsCtrl", GraphsController);
  
	GraphsController.$inject = ["$scope", "researchersDataService"];
  
  function GraphsController($scope, researchersDataService) {

    $scope.selectedTab = 'projects'; // Default tab

    $scope.selectTab = function(tab) {
      $scope.selectedTab = tab;
    }

    // Get researchers data to draw the graphs
    var researchersData = researchersDataService.getResearchersData();

    function drawGraph(type) {
      var dataset = {
        children: []
      }
      switch (type) {
        case 'projects':
          dataset.children = researchersData.map(function(researcher) {
            return {
              name: researcher.name,
              count: researcher.projects ? researcher.projects.length : 0
            }
          });
          break;
        case 'universities':
          var i, elemIndex;
          for (i = 0; i < researchersData.length; i++) {
            if (researchersData[i].university !== undefined) {
              if ((elemIndex = _.findIndex(dataset.children, {name: researchersData[i].university})) < 0) {
                dataset.children.push({name: researchersData[i].university, count: 1});
              } else {
                dataset.children[elemIndex].count++;
              }
            }
          }
          break;
        case 'departments':
          var i, elemIndex;
          for (i = 0; i < researchersData.length; i++) {
            if (researchersData[i].department !== undefined) {
              if ((elemIndex = _.findIndex(dataset.children, {name: researchersData[i].department})) < 0) {
                dataset.children.push({name: researchersData[i].department, count: 1});
              } else {
                dataset.children[elemIndex].count++;
              }
            }
          }
          break;
        case 'groups':
          var i, elemIndex;
          for (i = 0; i < researchersData.length; i++) {
            if (researchersData[i].researchGroup.name !== undefined) {
              if ((elemIndex = _.findIndex(dataset.children, {name: researchersData[i].researchGroup.name})) < 0) {
                dataset.children.push({name: researchersData[i].researchGroup.name, count: 1});
              } else {
                dataset.children[elemIndex].count++;
              }
            }
          }
          break;
      }

      var diameter = 600;
      var color = d3.scaleOrdinal(d3.schemeCategory20);
  
      var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);
  
      var svg = d3.select("#"+type+"TabContent")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");
  
      var nodes = d3.hierarchy(dataset)
        .sum(function(d) { return d.count; });
  
      var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
          return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
  
      node.append("title")
        .text(function(d) {
          return d.data.name + ": " + d.data.count;
        });
  
      node.append("circle")
        .attr("r", function(d) {
          return d.r;
        })
        .style("fill", function(d,i) {
          return color(i);
        });
  
      node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
          return d.r/9;
        })
        .attr("fill", "black");
  
      node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.count;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
          return d.r/5;
        })
        .attr("fill", "white");
  
      d3.select(self.frameElement)
        .style("height", diameter + "px");
    }

    if (researchersData && researchersData.length > 1) {
      drawGraph('projects');
      drawGraph('universities');
      drawGraph('departments');
      drawGraph('groups');
    }

  };