// Code goes here
/* global angular: true, window: true, document: true, console: true, setTimeout: true */
/* jslint globalstrict: true */

"use strict";
var TipsApp = angular.module("TipsApp", ['TipsApp.filters', 'ui.bootstrap', 'ngScrollSpy']);

TipsApp.controller('TipsCtrl', ['$scope', '$filter', '$http', '$templateCache', '$modal',
  function($scope, $filter, $http, $templateCache, $modal) {

  $scope.isStart = true;
  $scope.isReset = false;
  $scope.navCollapsed = true;
  $scope.isTypeIn = true;
  $scope.isCircIn = false;
  $scope.isTipsIn = false;
  $scope.isTypeOut = false;
  $scope.isCircOut = false;
  $scope.isTipsOut = false;
  $scope.isTypeHidden = false;
  $scope.isCircHidden = true;
  $scope.isTipsHidden = true;
  $scope.isCircClosed = true;
  $scope.isTipsClosed = true;
  $scope.isCircPanelOpen = true;
  $scope.isStepTwo = false;
  $scope.isStepThree = false;
  $scope.navPos = '0';

  $scope.isMc = function() {
    $scope.types.mc = true;
    $scope.types.mcs = false;
    $scope.types.mva = false;
    $scope.step2();
  };

  $scope.isMcs = function() {
    $scope.types.mc = false;
    $scope.types.mcs = true;
    $scope.types.mva = false;
    $scope.step2();
  };

  $scope.isMva = function() {
    $scope.types.mc = false;
    $scope.types.mcs = false;
    $scope.types.mva = true;
    $scope.step2();
  };

  $scope.step2 = function() {
    $scope.isStart = false;
    $scope.isTypeIn = false;
    $scope.isCircIn = true;
    $scope.isTipsIn = false;
    $scope.isTypeOut = true;
    $scope.isCircOut = false;
    $scope.isTipsOut = false;
    $scope.isTypeHidden = false;
    $scope.isCircHidden = false;
    $scope.isTipsHidden = true;
    $scope.closeType();
    $scope.openCirc();
  };

  $scope.step3 = function() {
    $scope.isTypeIn = false;
    $scope.isCircIn = false;
    $scope.isTipsIn = true;
    $scope.isTypeOut = false;
    $scope.isCircOut = true;
    $scope.isTipsOut = false;
    $scope.isTypeHidden = true;
    $scope.isCircHidden = false;
    $scope.isTipsHidden = false;
  };

  $scope.go = function() {
    $scope.toTop();
    $scope.step3();
  };

  $scope.startOver = function() {
    $scope.isTypeIn = true;
    $scope.isCircIn = false;
    $scope.isTipsIn = false;
    $scope.isTypeOut = false;
    $scope.isCircOut = false;
    $scope.isTipsOut = false;
    $scope.isTypeHidden = false;
    $scope.isCircHidden = true;
    $scope.isTipsHidden = true;
    $scope.types = {
      "mc": false,
      "mcs": false,
      "mva": false
    };

    $scope.circs = {
      "ayc": false,
      "ac": false,
      "aa": false,
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

  $scope.toTop = function() {
    window.scrollTo(0, 0);
  };

  $scope.closeType = function(){
    $scope.isTypeOut = true;
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
      controller: AboutCtrl
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

  $scope.circs = {
    "ayc": false,
    "ac": false,
    "aa": false,
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
