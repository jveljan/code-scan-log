'use strict';

angular.module('codeScanLog')
  .controller('LogPlanCtrl', function ($scope, $routeParams, $location, Storage) {
    var id = $routeParams.id;
    var isNew = !id;

    var lpstore = Storage.key('log-plan');
    if(!isNew) {
      $scope.plan = lpstore.get(id);
    }
    $scope.save = function() {
      if(isNew) {
        $scope.plan.readings = [];
        lpstore.create($scope.plan);
      } else {
        lpstore.update($scope.plan);
      }
      $location.path('/')
    }
  });
