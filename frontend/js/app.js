// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice',
  'pascalprecht.translate',
  'angulartics',
  'angulartics.google.analytics'
]);
firstapp.directive('fancybox', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            $element = $(element);

            setTimeout(function() {
                $(".various").fancybox({
                    maxWidth: 800,
                    maxHeight: 600,
                    fitToView: false,
                    width: '70%',
                    height: '70%',
                    autoSize: false,
                    closeClick: false,
                    openEffect: 'none',
                    closeEffect: 'none',
                    padding: 0

                });
            }, 100);

        }
    };
});
firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "frontend/views/template.html",
      controller: 'HomeCtrl'
    })
  $stateProvider
    .state('tbtstatic', {
      url: "/tbtstatic",
      templateUrl: "frontend/views/template.html",
      controller: 'StaticCtrl'
    })
    .state('customisation', {
      url: "/customisation",
      templateUrl: "frontend/views/template.html",
      controller: 'CustomisationCtrl'
    })

  .state('destination', {
      url: "/destination",
      templateUrl: "frontend/views/template.html",
      controller: 'DestinationCtrl'
    })
    .state('pattaya', {
      url: "/pattaya/:id",
      templateUrl: "frontend/views/template.html",
      controller: 'PattayaCtrl'
    })
    .state('pattaya2', {
      url: "/pattaya2/:id",
      templateUrl: "frontend/views/template.html",
      controller: 'Pattaya2Ctrl'
    })
    .state('whats-hot-more', {
      url: "/whats-hot-more/:id",
      templateUrl: "frontend/views/template.html",
      controller: 'Whats-hot-moreCtrl'
    })
    .state('whats-hot', {
      url: "/whats-hot",
      templateUrl: "frontend/views/template.html",
      controller: 'WhatsHotCtrl'
    })
    .state('activity', {
      url: "/activity",
      templateUrl: "frontend/views/template.html",
      controller: 'ActivityCtrl'
    });
  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(isproduction);
});


firstapp.directive('img', function($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});

firstapp.filter('serverimage', function() {
  return function(image) {
    if (image && image !== null) {
      return adminurl + "upload/readFile?file=" + image;
    } else {
      return undefined;
    }
  }
});

firstapp.directive('fancyboxBox', function($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function(scope, element, attr) {
      var $element = $(element);
      var target;
      if (attr.rel) {
        target = $("[rel='" + attr.rel + "']");
      } else {
        target = element;
      }

      target.fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        helpers: {
          media: {}
        }
      });
    }
  };
});

firstapp.config(function($translateProvider) {
  $translateProvider.translations('en', LanguageEnglish);
  $translateProvider.translations('hi', LanguageHindi);
  $translateProvider.preferredLanguage('en');
});
firstapp.filter('youtubethumb', function() {
    return function(input, onlyid) {
        if (input) {
          console.log(input);
            return "http://img.youtube.com/vi/" + input + "/hqdefault.jpg";
            // console.log();
        }
    };
});
