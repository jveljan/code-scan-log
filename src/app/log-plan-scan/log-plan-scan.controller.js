'use strict';

angular.module('codeScanLog')
  .controller('LogPlanScanCtrl', function ($scope, $routeParams, $location, Storage) {
    var id = $routeParams.id;
    var index = $routeParams.index;
    var lpstore = Storage.key('log-plan');
    $scope.plan = lpstore.get(id);
    $scope.codes = $scope.plan.readings[index].codes;

    $scope.addCode = function() {
      if(!$scope.code) {
        alert("Enter Code");
        return;
      }
      $scope.codes.push({code: $scope.code, timestamp: new Date() });
      $scope.code = "";
    }
    $scope.removeCode = function(idx) {
      $scope.codes.splice(idx, 1);
    }

    function duplicateIndex(arr) {
      for(var i=0; i<arr.length; i++) {
        for(var j=i+1; j<arr.length; j++) {
          if(arr[i]===arr[j]) {
            return i;
          }
        }
      }
      return -1;
    }

    $scope.submit = function() {
      var dup = duplicateIndex($scope.codes.map(function(c) { return c.code; }));
      if(dup != -1) {
        alert('There are duplicate codes, check Idx ' + (dup+1));
        return;
      }

      $scope.plan.readings[index].codes = $scope.codes;
      lpstore.update($scope.plan);
      $location.path('/log-plan-details/' + $scope.plan.id);
    }

  });
