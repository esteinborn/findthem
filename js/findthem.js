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

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.10.0 - 2014-01-18
 * License: MIT
 */
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.modal"]);
angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html","template/accordion/accordion.html","template/modal/backdrop.html","template/modal/window.html"]);
angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition'])

  .directive('collapse', ['$transition', function ($transition, $timeout) {

    return {
      link: function (scope, element, attrs) {

        var initialAnimSkip = true;
        var currentTransition;

        function doTransition(change) {
          var newTransition = $transition(element, change);
          if (currentTransition) {
            currentTransition.cancel();
          }
          currentTransition = newTransition;
          newTransition.then(newTransitionDone, newTransitionDone);
          return newTransition;

          function newTransitionDone() {
            // Make sure it's this transition, otherwise, leave it alone.
            if (currentTransition === newTransition) {
              currentTransition = undefined;
            }
          }
        }

        function expand() {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            expandDone();
          } else {
            element.removeClass('collapse').addClass('collapsing');
            doTransition({ height: element[0].scrollHeight + 'px' }).then(expandDone);
          }
        }

        function expandDone() {
          element.removeClass('collapsing');
          element.addClass('collapse in');
          element.css({height: 'auto'});
        }

        function collapse() {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            collapseDone();
            element.css({height: 0});
          } else {
            // CSS transitions don't work with height: auto, so we have to manually change the height to a specific value
            element.css({ height: element[0].scrollHeight + 'px' });
            //trigger reflow so a browser realizes that height was updated from auto to a specific value
            var x = element[0].offsetWidth;

            element.removeClass('collapse in').addClass('collapsing');

            doTransition({ height: 0 }).then(collapseDone);
          }
        }

        function collapseDone() {
          element.removeClass('collapsing');
          element.addClass('collapse');
        }

        scope.$watch(attrs.collapse, function (shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse'])

.constant('accordionConfig', {
  closeOthers: true
})

.controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {

  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if ( closeOthers ) {
      angular.forEach(this.groups, function (group) {
        if ( group !== openGroup ) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(this.groups.indexOf(group), 1);
    }
  };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('accordion', function () {
  return {
    restrict:'EA',
    controller:'AccordionController',
    transclude: true,
    replace: false,
    templateUrl: 'template/accordion/accordion.html'
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', ['$parse', function($parse) {
  return {
    require:'^accordion',         // We need this directive to be inside an accordion
    restrict:'EA',
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl:'template/accordion/accordion-group.html',
    scope:{ heading:'@' },        // Create an isolated scope and interpolate the heading attribute onto this scope
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      var getIsOpen, setIsOpen;

      accordionCtrl.addGroup(scope);

      scope.isOpen = false;

      if ( attrs.isOpen ) {
        getIsOpen = $parse(attrs.isOpen);
        setIsOpen = getIsOpen.assign;

        scope.$parent.$watch(getIsOpen, function(value) {
          scope.isOpen = !!value;
        });
      }

      scope.$watch('isOpen', function(value) {
        if ( value ) {
          accordionCtrl.closeOthers(scope);
        }
        if ( setIsOpen ) {
          setIsOpen(scope.$parent, value);
        }
      });
    }
  };
}])

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
.directive('accordionHeading', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^accordionGroup',
    compile: function(element, attr, transclude) {
      return function link(scope, element, attr, accordionGroupCtrl) {
        // Pass the heading to the accordion-group controller
        // so that it can be transcluded into the right place in the template
        // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
        accordionGroupCtrl.setHeading(transclude(scope, function() {}));
      };
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
.directive('accordionTransclude', function() {
  return {
    require: '^accordionGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {
        if ( heading ) {
          element.html('');
          element.append(heading);
        }
      });
    }
  };
});

angular.module('ui.bootstrap.modal', ['ui.bootstrap.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope) {

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });
      }
    };
  }])

  .directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        index: '@',
        animate: '='
      },
      replace: true,
      transclude: true,
      templateUrl: 'template/modal/window.html',
      link: function (scope, element, attrs) {
        scope.windowClass = attrs.windowClass || '';
        scope.modalClass = attrs.modalClass || '';

        $timeout(function () {
          // trigger CSS transitions
          scope.animate = true;
          // focus a freshly-opened modal
          element[0].focus();
        });

        scope.close = function (evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .factory('$modalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance) {

        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, checkRemoveBackdrop);
        body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
      }

      function checkRemoveBackdrop() {
          //remove backdrop if no longer needed
          if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
              backdropScopeRef.$destroy();
              backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
          }
      }

      function removeAfterAnimate(domEl, scope, emulateTime, done) {
        // Closing animation
        scope.animate = false;

        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
          // transition out
          var timeout = $timeout(afterAnimating, emulateTime);

          domEl.bind(transitionEndEventName, function () {
            $timeout.cancel(timeout);
            afterAnimating();
            scope.$apply();
          });
        } else {
          // Ensure this call is async
          $timeout(afterAnimating, 0);
        }

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          if (done) {
            done();
          }
        }
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key);
            });
          }
        }
      });

      $modalStack.open = function (modalInstance, modal) {

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });

        var body = $document.find('body').eq(0),
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          backdropDomEl = $compile('<div modal-backdrop></div>')(backdropScope);
          body.append(backdropDomEl);
        }

        var angularDomEl = angular.element('<div modal-window></div>');
        angularDomEl.attr('window-class', modal.windowClass);
        angularDomEl.attr('modal-class', modal.modalClass);
        angularDomEl.attr('index', openedWindows.length() - 1);
        angularDomEl.attr('animate', 'animate');
        angularDomEl.html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
      };

      $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
          modalWindow.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
          modalWindow.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal) {
          this.dismiss(topModal.key, reason);
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      return $modalStack;
    }])

  .provider('$modal', function () {

    var $modalProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                return result.data;
              });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value, key) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $modal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                windowClass: modalOptions.windowClass,
                modalClass: modalOptions.modalClass
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function () {
              modalOpenedDeferred.reject(false);
            });

            return modalInstance;
          };

          return $modal;
        }]
    };

    return $modalProvider;
  });

angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a class=\"accordion-toggle\" ng-click=\"isOpen = !isOpen\" accordion-transclude=\"heading\">{{heading}}</a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"panel-collapse\" collapse=\"!isOpen\">\n" +
    "    <div class=\"panel-body\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion.html",
    "<div class=\"panel-group\" ng-transclude></div>");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog {{ modalClass }}\"><div class=\"modal-content\" ng-transclude></div></div>\n" +
    "</div>");
}]);

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


/* ng-ScrollSpy.js v2.0.0
 * https://github.com/patrickmarabeas/ng-ScrollSpy.js
 *
 * Copyright 2014, Patrick Marabeas http://pulse-dev.com
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 28/02/2014
 */

angular.module( 'ngScrollSpy', [] )

  .directive( 'scrollspyBroadcast', [ '$rootScope', function( $rootScope ) {
    return {
      restrict: 'A',
      scope: {},
      link: function( scope, element, attrs ) {

        scope.activate = function() {

          scope.documentHeight = Math
            .max(
              document.body.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.clientHeight,
              document.documentElement.scrollHeight,
              document.documentElement.offsetHeight
            );

//          distance down the page the top of the window is currently at
          scope.userScrolledTop = ( window.pageYOffset !== undefined ) ? window.pageYOffset : ( document.documentElement || document.body.parentNode || document.body ).scrollTop;
//          distance down the page the bottom of the window is currently at
          scope.userScrolledBottom = scope.userScrolledTop + window.innerHeight;

          scope.elementOffsetTop = element[0].offsetTop;
          scope.elementOffsetBottom = scope.elementOffsetTop + Math.max( element[0].scrollHeight, element[0].offsetHeight );

          scope.triggerOffset = 0;

          if( ( scope.elementOffsetTop - scope.triggerOffset ) < ( scope.documentHeight - window.innerHeight ) ) {
            if( scope.elementOffsetTop <= ( scope.userScrolledTop + scope.triggerOffset ) ) {
              $rootScope.$broadcast( 'spied', {
                'activeSpy': attrs.id
              });
            }
            if (scope.userScrolledTop === 0 ) {
              $rootScope.$broadcast( 'atTop');
            }
          } else {
            if( scope.userScrolledBottom > ( scope.elementOffsetBottom - scope.triggerOffset ) ) {
              $rootScope.$broadcast( 'spied', {
                'activeSpy': attrs.id
              });
            }
          }

        };

        // angular.element( document ).ready( function() {
        //   scope.activate();
        // });

        angular.element( window ).bind( 'scroll', function() {
          scope.activate();
        });

      }
    };
  }])


  .directive( 'scrollspyListen', [ '$rootScope', function( $rootScope ) {
    return {
      restrict: 'A',
      scope: {
        scrollspyListen: '@',
        enabled: '@'
      },
      replace: true,
      transclude: true,
      template: function( element, attrs ) {
        var tag = element[0].nodeName;
        return '<'+tag+' data-ng-transclude data-ng-class="{active: enabled}"></'+tag+'>';
      },
      link: function( scope, element, attrs ) {
        $rootScope.$on('spied', function(event, args){

          scope.enabled = false;

          if( scope.scrollspyListen === args.activeSpy ) {
            scope.enabled = true;
          }

          if( !scope.$$phase ) {
            scope.$digest();
          }

        });

      }
    };
  }])

  .directive( 'scrollspyNav', [ '$rootScope', function( $rootScope ) {
    return {
      restrict: 'A',
      scope: {
        isAffixedSmall: '@',
        isAffixedLarge: '@'
      },
      replace: true,
      transclude: true,
      template: function( element, attrs ) {
        var tag = element[0].nodeName;
        return '<'+tag+' data-ng-transclude data-ng-class="{\'navbar-fixed-top\': isAffixedSmall, affix: isAffixedLarge, \'col-sm-3\': isAffixedLarge}"></'+tag+'>';
      },
      link: function( scope, element, attrs ) {

        $rootScope.$on('spied', function(event, args){
          scope.currentScroll = ( window.pageYOffset !== undefined ) ? window.pageYOffset : ( document.documentElement || document.body.parentNode || document.body ).scrollTop;
          scope.isVisible = element[0].offsetWidth > 0 || element[0].offsetHeight > 0;

          // if( scope.isVisible && (scope.$parent.navPos <=  scope.currentScroll)) {
          if( scope.isVisible && (scope.currentScroll >= 155 )) {
            if (window.matchMedia){
              if (window.matchMedia("(min-width: 767px)").matches) {
                scope.isAffixedLarge = true;
              } else {
                scope.isAffixedSmall = true;
              }
            }
          } else {
            scope.isAffixedSmall = false;
            scope.isAffixedLarge = false;
          }

          if( !scope.$$phase ) {
            scope.$digest();
          }

        });
        $rootScope.$on('atTop', function(event, args){
          scope.isAffixedSmall = false;
          scope.isAffixedLarge = false;

          if( !scope.$$phase ) {
            scope.$digest();
          }
        });
      }
    };
}]);