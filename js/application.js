// Code goes here
/* global angular: true, window: true, document: true, console: true, setTimeout: true, history: true */
/* jslint globalstrict: true */

"use strict";
var TipsApp = angular.module("TipsApp", ['TipsApp.filters', 'ui.bootstrap', 'ngScrollSpy']);

TipsApp.controller('TipsCtrl', ['$scope', '$filter', '$http', '$templateCache', '$modal',
  function($scope, $filter, $http, $templateCache, $modal) {

  $scope.navCollapsed = true;
  $scope.isTypeClosed = false;
  $scope.isCircClosed = true;
  $scope.isTipsClosed = true;
  $scope.isCircPanelOpen = true;
  $scope.isAgeSelected = false;
  $scope.navPos = '0';

  $scope.isMc = function() {
    $scope.types.mc = true;
    $scope.types.mcs = false;
    $scope.types.mva = false;
    $scope.step1();
  };

  $scope.isMcs = function() {
    $scope.types.mc = false;
    $scope.types.mcs = true;
    $scope.types.mva = false;
    $scope.step1();
  };

  $scope.isMva = function() {
    $scope.types.mc = false;
    $scope.types.mcs = false;
    $scope.types.mva = true;
    $scope.step1();
  };

  $scope.step1 = function() {
    $scope.closeType();
    $scope.openCirc();
  };

  $scope.step2 = function() {
    $scope.closeCircPanel();
    $scope.openTips();
  };

  $scope.go = function() {
    $scope.step2();
  };

  $scope.startOver = function() {
    $scope.navCollapsed = true;
    $scope.toTop();
    $scope.openType();
    $scope.closeTips();
    $scope.closeCirc();
    $scope.openCircPanel();

    $scope.types = {
      "mc": false,
      "mcs": false,
      "mva": false
    };

    $scope.ages = {
      "ayc": false,
      "ac": false,
      "aa": false
    };

    $scope.circs = {
      "alz": false,
      "dd": false,
      "ds": false,
      "aut": false,
      "abd": false,
      "run": false,
      "unk": false,
      "lwa": false,
      "med": false,
      "veh": false,
      "oft": false
    };
  };

  $scope.toTop = function(ofTips) {
    if (ofTips) {
      if (window.matchMedia){
        if (window.matchMedia("(min-width: 767px)").matches) {
          setTimeout(function(){
            window.scrollTo(0, 130);
          }, 200);
        } else {
          setTimeout(function(){
            window.scrollTo(0, 185);
          }, 200);
        }
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  $scope.closeType = function(){
    $scope.isTypeClosed = true;
  };

  $scope.openType = function(){
    $scope.isTypeClosed = false;
  };

  $scope.closeCirc = function(){
    $scope.isCircClosed= true;
  };

  $scope.openCirc = function(){
    $scope.isCircClosed= false;
  };

  $scope.closeCircPanel = function(){
    $scope.isCircPanelOpen= false;
  };

  $scope.openCircPanel = function(){
    $scope.isCircPanelOpen= true;
  };

  $scope.closeTips = function(){
    $scope.isTipsClosed = true;
  };

  $scope.openTips = function(){
    $scope.isTipsClosed = false;
  };

  $scope.getNavPos = function(){
    return setTimeout(function(){
      $scope.navPos = document.getElementById('nav').getBoundingClientRect().top;

    }, 500);

  };

  $scope.openInfo = function () {
    var modalInstance = $modal.open({
      templateUrl: 'about.htm',
      controller: AboutCtrl,
      modalClass: 'modal-lg mobile-overflow'
    });
  };

  var AboutCtrl = function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };
  };

  $scope.openStartOver = function () {
    var modalInstance = $modal.open({
      templateUrl: 'startover.htm',
      controller: StartOverCtrl
    });

    modalInstance.result.then(function (isOk) {
      if (isOk) {
        $scope.startOver();
      }
    });
  };

  var StartOverCtrl = function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close($scope.resetOK= true);
    };

    $scope.cancel = function () {
      $modalInstance.close();
    };
  };

  $scope.types = {
    "mc": false,
    "mcs": false,
    "mva": false
  };

  $scope.ages = {
    "ayc": false,
    "ac": false,
    "aa": false
  };

  $scope.circs = {
    "alz": false,
    "dd": false,
    "ds": false,
    "aut": false,
    "abd": false,
    "run": false,
    "unk": false,
    "lwa": false,
    "med": false,
    "veh": false,
    "oft": false
  };

  $http({method: 'get', url: 'data/tips.json'}).
    success(function(data, status) {
      $scope.tips = data[0].tips;
      $scope.resources = data[0].resources;
    }).error(function(data, status, headers, config) {});
}]);
