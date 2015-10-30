'use strict';

angular.module('codeScanLog', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/log-plan', {
        templateUrl: 'app/log-plan/log-plan.html',
        controller: 'LogPlanCtrl'
      })
      .when('/log-plan/:id', {
        templateUrl: 'app/log-plan/log-plan.html',
        controller: 'LogPlanCtrl'
      })
      .when('/log-plan-details/:id', {
        templateUrl: 'app/log-plan-details/log-plan-details.html',
        controller: 'LogPlanDetailsCtrl'
      })
      .when('/log-plan-scan/:id/:index', {
        templateUrl: 'app/log-plan-scan/log-plan-scan.html',
        controller: 'LogPlanScanCtrl'
      })
//      .otherwise({
//        redirectTo: '/'
//      });
  })
;
