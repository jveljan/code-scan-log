'use strict';

angular.module('codeScanLog')
  .controller('MainCtrl', function ($scope, Storage) {
    var lpstore = Storage.key('log-plan');
    $scope.logPlans = lpstore.list();
    $scope.remove = function(lp) {
      if( confirm('Are you sure you want to remove "'+lp.name+'"?') ) {
        lpstore.remove(lp);
        $scope.logPlans = lpstore.list();
      }
    }
    $scope.totalCodes = function(lp) {
      return lp.readings.reduce(function(a, b) { return a + b.codes.length; }, 0);
    }

    $scope.copyWp = function(lp) {
      var n = angular.fromJson(angular.toJson(lp));
      var v = lpstore.create({});
      n.id = v.id;
      lpstore.update(n);
      $scope.logPlans = lpstore.list();
    }
  });
