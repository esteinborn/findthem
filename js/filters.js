// Code goes here
/* global angular: true, window: true, document: true, console: true */

angular.module('TipsApp.filters', [])
  .filter('typeFilter', function() {

  return function ( items, types ) {
    var filtered = [];
    angular.forEach(items, function (item) {
      var type = item.type;

      if ( type.indexOf('all') >= 0 ) {
        filtered.push(item);
      }
      else if ( types.mc  === true && type.indexOf('mc')  >= 0 ) {
        filtered.push(item);
      }
      else if ( types.mcs === true && type.indexOf('mcs') >= 0 ) {
        filtered.push(item);
      }
      else if ( types.mva === true && type.indexOf('mva') >= 0 ) {
        filtered.push(item);
      }

    });
    return filtered;
  };
})

  .filter('circFilter', function() {

  return function ( items, circs ) {
    var filtered = [];

    angular.forEach(items, function (item) {
      var circ = item.circ;

      if (circ.indexOf('all') >= 0 || !circ) {
        filtered.push(item);
      }
      else if ( circs.alz === true && circ.indexOf('alz') >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.dd  === true && circ.indexOf('dd')  >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.ds  === true && circ.indexOf('ds')  >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.aut === true && circ.indexOf('aut') >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.abd === true && circ.indexOf('abd') >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.run === true && circ.indexOf('run') >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.unk === true && circ.indexOf('unk') >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.lwa === true && circ.indexOf('lwa') >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.med === true && circ.indexOf('med') >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.veh === true && circ.indexOf('veh') >= 0 ) {
        filtered.push(item);
      }
      else if ( circs.oft === true && circ.indexOf('oft') >= 0 ) {
        filtered.push(item);
      }

    });

    return filtered;
  };
})
  .filter('ageFilter', function() {

  return function ( items, ages ) {
    var filtered = [];

    angular.forEach(items, function (item) {
      var age = item.age;

      if ( age.indexOf('all') >= 0 ) {
        filtered.push(item);
      }
      else if ( ages.ayc === true && age.indexOf('ayc') >= 0 ) {
        filtered.push(item);
      }
      else if ( ages.ac  === true && age.indexOf('ac')  >= 0 ) {
        filtered.push(item);
      }
      else if ( ages.aa  === true && age.indexOf('aa')  >= 0 ) {
        filtered.push(item);
      }

    });

    return filtered;
  };
});

