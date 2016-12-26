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

    .state('accessories', {
        url: "/accessories",
        templateUrl: "frontend/views/template.html",
        controller: 'AccessoriesCtrl'
    })
    .state('highrollers', {
        url: "/highrollers",
        templateUrl: "frontend/views/template.html",
        controller: 'HighrollersCtrl'
    })
    .state('bachlerette', {
        url: "/bachlerette",
        templateUrl: "frontend/views/template.html",
        controller: 'BachleretteCtrl'
    })

    .state('aboutus', {
        url: "/aboutus",
        templateUrl: "frontend/views/template.html",
        controller: 'AboutCtrl'
    })

    .state('contactus', {
        url: "/contactus",
        templateUrl: "frontend/views/template.html",
        controller: 'ContactCtrl'
    })

    .state('mediacorner', {
        url: "/mediacorner",
        templateUrl: "frontend/views/template.html",
        controller: 'MediaCornerCtrl'
    })

    .state('tbtstatic', {
            url: "/tbtstatic",
            templateUrl: "frontend/views/template.html",
            controller: 'StaticCtrl'
        })
        .state('customisation', {
            url: "/customisation/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'CustomisationCtrl'
        })

    .state('destination', {
            url: "/destination",
            templateUrl: "frontend/views/template.html",
            controller: 'DestinationCtrl'
        })
        .state('customdestination', {
            url: "/customdestination/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'PattayaCtrl'
        })
        .state('pakage', {
            url: "/pakage/:id",
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
                $element.after("<img src='frontend/img/loading.gif' class='loading' />");
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
firstapp.directive('autoHeight', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            var addHeight = function() {
                $element.css("min-height", windowHeight);
            };
            addHeight();
        }
    };
});
// firstapp.filter('serverimage', function() {
//   return function(image) {
//     if (image && image !== null) {
//       return adminurl + "upload/readFile?file=" + image;
//     } else {
//       return undefined;
//     }
//   }
// });

firstapp.filter('serverimage', function() {
    return function(image, width, height, style) {
        var other = "";
        if (width && width != "") {
            other += "&width=" + width;
        }
        if (height && height != "") {
            other += "&height=" + height;
        }
        if (style && style != "") {
            other += "&style=" + style;
        }
        if (image) {
            if (image.indexOf('https://') == -1) {
                return adminurl + "upload/readFile?file=" + image + other;
            } else {
                return image;
            }
        }
    };
});
// :130:130:cover
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
firstapp.filter('rawHtml', ['$sce',
    function($sce) {
        return function(val) {
            console.log(val);
            return $sce.trustAsHtml(val);
        };
    }
]);
firstapp.filter('trusted', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
firstapp.filter('shorten', function() {
    return function(value, limit) {
        if (value)
            if (value.length < limit) {
                return value;
            } else {
                return value.slice(0, limit - 2) + "..";

            }

    };
});

firstapp.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);
firstapp.filter('TbtIcon', function() {
    return function(input) {
        console.log(input);
        var returnImg = "frontend/img/tbtIcons/";
        switch (input) {
            case "The City":
                returnImg += "The-City.png";
                break;

            case "How to get there":
                returnImg += "How-to-get-there.png";
                break;

            case "Distances":
                returnImg += "Distance.png";
                break;

            case "Travel in style":
                returnImg += "Travel-in-Style.png";
                break;

            case "Visa Info":
                returnImg += "Visa-Info.png";
                break;

            case "Booze and Chill":
                returnImg += "Booze-and-Chill.png";
                break;

            case "Tourist Attraction":
                returnImg += "Tourist-Attraction.png";
                break;

            case "Action Adventure":
                returnImg += "Action-Adventure.png";
                break;

            case "Exclusively for the Bachelors":
                returnImg += "Exclusively-for-the-Bachelors.png";
                break;

            case "For Art enthusiasts":
                returnImg += "for-art-enthusiasts.png";
                break;

            case "Things not to do here":
                returnImg += "Things-not-to-do-here.png";
                break;

            case "Things to take back":
                returnImg += "Things-to-take-back.png";
                break;

            case "Events and Festivals":
                returnImg += "Festivals.png";
                break;

            case "Get beachy":
                returnImg += "Get-Beachy.png";
                break;

        }
        return returnImg;
    };
});
