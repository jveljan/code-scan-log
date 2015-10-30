'use strict';

angular.module('codeScanLog')
  .controller('LogPlanDetailsCtrl', function ($scope, $routeParams, $location, Storage) {
    var id = $routeParams.id;
    var lpstore = Storage.key('log-plan');
    $scope.plan = lpstore.get(id);
    if(!$scope.plan.readings) {
      $scope.plan.readings = [];
      lpstore.update($scope.plan);
    }

    $scope.addReading = function() {
      $scope.plan.readings.push({
        createdOn: new Date(),
        codes: []
      });
      lpstore.update($scope.plan);
      $location.path('/log-plan-scan/' + $scope.plan.id + '/' + ($scope.plan.readings.length-1));
    }
    $scope.removeReading = function(idx) {
      if(confirm('Are you sure?')) {
        $scope.plan.readings.splice(idx, 1);
        lpstore.update($scope.plan);
      }
    }

    function download(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    $scope.export = function() {
      var data = $scope.plan.readings.map(function(r) {
        return r.codes.map(function(c) { return c.timestamp + ', ' + c.code; }).join('\n');
      }).join('\n\n');
      download($scope.plan.name, data);
    }

    $scope.dup = function() {
      var readingCopyMapper = function(r) {
        var o = angular.fromJson(angular.toJson(r));
        o.copyTime = new Date();
        return o;
      }
      var copyList = $scope.plan.readings.map(readingCopyMapper);
      $scope.plan.readings = $scope.plan.readings.concat(copyList);
      lpstore.update($scope.plan);
    }

  });
