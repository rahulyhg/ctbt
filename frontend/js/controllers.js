var globalfunction = {};

angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.select', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ksSwiper', 'wu.masonry'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
           // $scope.subscribeData = {};
        // $scope.subscribeComplete = false;
        // $scope.alreadySubscribed = false;
        // $scope.subscribeSubmit = function(subscribeData) {
        //     console.log("subscribeData", subscribeData);
        //     NavigationService.subscribe(subscribeData, function(data) {
        //         console.log("data", data.value);
        //         if (data) {
        //             console.log('insiddee ifff');
        //             $scope.subscribeComplete = true;
        //             $timeout(function() {
        //                 $scope.subscribeComplete = false;
        //                 $scope.subscribeData = {};
        //             }, 2000);
        //         } else {
        //             console.log('inside elseeee');
        //             $scope.alreadySubscribed = true;
        //             $timeout(function() {
        //                 $scope.alreadySubscribed = false;
        //                 $scope.subscribeData = {};
        //             }, 2000);
        //         }
        //
        //     })
        //     })
        // }
        $scope.showVideo = false;
        if (!$scope.showVideo) {
            $scope.playVideo = 'https://www.youtube-nocookie.com/embed/kjiiPkug0Qw';

        } else {
            $scope.playVideo = 'https://www.youtube-nocookie.com/embed/kjiiPkug0Qw?autoplay=1&modestbranding=0&showinfo=0&rel=0&loop=1';

        }
        $scope.hideShow = function() {
            $scope.showVideo = true;
            $scope.playVideo = 'https://www.youtube-nocookie.com/embed/kjiiPkug0Qw?autoplay=1&modestbranding=0&showinfo=0&rel=0&loop=1';
        }

        $scope.openModals = function() {
            $scope.modalInstanceABC = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'frontend/views/modal/videoplay.html',
                // controller: 'HomeCtrl',
                windowClass: 'autoplayv',
                scope: $scope
            });
        };

        $scope.$on('$viewContentLoaded', function() {
            if (!$.jStorage.get('FirstTime')) {
                $.jStorage.set('FirstTime', {
                    value: true
                });
                $scope.openModals();
            }
        });

        // console.log("Testing Consoles");
        //
        // $timeout(function(){
        //    $dialog.dialog({}).open('frontend/views/modal/videoplay.html');
        //  }, 3000);

        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("TBT-The Bachelor Trip | Plan the Bachelor Trip of a Lifetime");
        TemplateService.header = "frontend/views/home_header.html";
        TemplateService.title = $scope.menutitle;

        console.log("HOME TITELE",$scope.menutitle);
        TemplateService.description = "Looking for the perfect break before the big day? Celebrate the trip of a lifetime at the best bachelor party destinations with your friends only with TBT. ";
        TemplateService.keywords = "bachelor trip, bachelor party destinations , bachelor party, bachelor party planning, bachelor party themes";

        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.formdata = {};
        $scope.selectDesti = function(id) {
            // state.go(pattaya{id:formdata})
            console.log("id", id);
        }


        NavigationService.HomeSlider(function(data) {
            $scope.mySlidestop = data.data.data.HomeSlider;

            $scope.popularDestination = data.data.data.popularDestination;

            $scope.popularAttraction = data.data.data.popularAttraction;
            $scope.dropDown = data.data.data.DestinationDropdown;
            console.log('$scope.dropDown', $scope.dropDown);

            $scope.mySlidesss = data.data.data.whatsHotBanner;
            console.log("$scope.mySlides", $scope.mySlidesss);
            TemplateService.removeLoader();
        });
        $scope.imDisable = false;
        $scope.forSearch = function(id) {
            console.log('forSearchID', id);
            $scope.thisId = id;
        }
        $scope.goOn = function(id) {
            console.log('idd', id);
            if (id == undefined) {
                $scope.imDisable = true;
            } else {
                // $scope.imDisable = false;
                console.log(id);
                $state.go('customisation', {
                    id: id
                });
            }


        }

        //top slider
        //   $scope.mySlidestop = [
        //
        //   //   {
        //   //     img: "img/Group-35.jpg",
        //   // }, {
        //   //     img: "img/Group-35.jpg",
        //   // }, {
        //   //     img: "img/Group-35.jpg",
        //   // }, {
        //   //     img: "img/Group-35.jpg"
        //   // }
        // ];

        // whats hot slide
        $scope.mySlides = [{
            img: "img/qwe.jpg",
            events: "TOMMOROWLAND",
            date: "27th Agust,2016"
        }, {
            img: "img/qwe.jpg",
            events: "TOMMOROWLAND",
            date: "27th Agust,2016"
        }, {
            img: "img/qwe.jpg",
            events: "TOMMOROWLAND",
            date: "27th Agust,2016"
        }, {
            img: "img/qwe.jpg",
            events: "TOMMOROWLAND",
            date: "27th Agust,2016"
        }];

        // $scope.mySlides = [
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
        // ];
        // =============== For Cart =================

        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', input);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.data.value);
                if (data.data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFunHeader();
                $scope.cartData = {};
                // TemplateService.removeLoader();
            });
            $timeout(function() {
                console.log('inside timeout');
                // $scope.submitCart = false;
                $scope.onSubmitCart.close();
            }, 5000);
        }
        $scope.getCartFunHeader = function() {
            console.log('inside gettttttt cart');
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                // console.log('$scope.checkCartIsEmpty',$scope.checkCartIsEmpty);
                // console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFunHeader();
        $scope.deleteCart = function(type, id) {
            console.log(type, id);
            NavigationService.deleteCart(type, id, function(data) {
                console.log('deleted', data);
                $scope.getCartFunHeader();
            });
        }
        $scope.deleteCartAcco = function(type, name) {
            console.log(type, name);
            NavigationService.deleteCartAccomodation(type, name, function(data) {
                console.log('deleted', data);
                $scope.getCartFunHeader();
            });
        }

        // =============== End Cart =================



        //----seo-----//



        //----seo----//
    })
    .controller('BachleretteCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {


        $scope.template = TemplateService.changecontent("bachlerette");
        $scope.menutitle = NavigationService.makeactive("Why Should Boys Have All the Fun | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Life is harder after marriage for the girls. So ladies, special offers and packages are coming your way soon so celebrate your bachelorette party with us!";
        TemplateService.keywords = "bachelor trip, bachelorette party, bachelorette party ideas,bachelorette party accessories";

        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.formComplete = false;
        $scope.enquiryData = {};
        $scope.submitEnq = false;
        $scope.enqSubmitPopup = function() {
            $scope.onSubmitEnq = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/enq.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.currentDate = new Date();
        // $scope.enqSubmitPopup();
        $scope.enquirySubmit = function(input, myForm) {
            console.log('input', input);
            NavigationService.enquiryForm($scope.enquiryData, function(data) {
                console.log("data", data.data.value);
                myForm.cities.$touched = false;
                myForm.activitie.$touched = false;
                myForm.size.$touched = false;
                myForm.from.$touched = false;
                myForm.to.$touched = false;
                myForm.comments.$touched = false;
                myForm.name.$touched = false;
                myForm.phone.$touched = false;
                myForm.email.$touched = false;
                if (data.data.value === true) {
                    $scope.enquiryData = {};
                    console.log('inside ifff');
                    // $scope.submitEnq = true;
                    $scope.enqSubmitPopup();
                    $timeout(function() {
                        console.log('inside timeout');
                        $scope.onSubmitEnq.close();
                        // $scope.enquiryData = {};

                    }, 5000);
                }

            });

        }

        // $scope.subscribeData = {};
        // $scope.subscribeComplete = false;
        // $scope.subscribeSubmit = function(subscribeData) {
        //     console.log("subscribeData", subscribeData);
        //     NavigationService.subscribe(subscribeData, function(data) {
        //         console.log("data", data.value);
        //         if (data.value === true) {
        //             $scope.subscribeComplete = true;
        //         }
        //         $timeout(function() {
        //             $scope.subscribeComplete = false;
        //             $scope.subscribeData = {};
        //         }, 2000);
        //
        //     })
        // }

        $scope.submitCart = false;
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };

        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', myForm);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;

            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.data.value);
                if (data.data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFun();

            });
            $timeout(function() {
                console.log('inside timeout');
                // $scope.submitCart = false;
                $scope.onSubmitCart.close();
                $scope.cartData = {};
            }, 5000);
        }

        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivityPage = data.data.data.activities;
                console.log('$scope.getCartDataActivityPage', $scope.getCartDataActivityPage);

                // $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
                TemplateService.removeLoader();
            });
        }
        $scope.getCartFun();
        $scope.formComplete = false;
        $scope.enquiryData = {};
        // $scope.enquirySubmit = function(input) {
        //     console.log('input', input);
        //     NavigationService.enquiryForm($scope.enquiryData, function(data) {
        //         console.log("data", data.value);
        //         if (data.value === true) {}
        //     });
        // }
    })

.controller('MediaCornerCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {


        $scope.template = TemplateService.changecontent("mediacorner");
        $scope.menutitle = NavigationService.makeactive("MediaCorner");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Before the wedding bells signal the end of your bachelorhood, get out and take the trip of a lifetime! Your bachelor trip will be a once-in-a-lifetime event and we are here to make sure it turns out to be so crazy that you won't even be able to talk about it!";
        TemplateService.keywords = "bachelor trip, bachelor party, bachelor party destinations, bachelor trip destinations, bachelorhood, best party destinations";

        $scope.navigation = NavigationService.getnav();

    })
    .controller('AccessoriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {

        $scope.template = TemplateService.changecontent("accessories");
        $scope.menutitle = NavigationService.makeactive("Dress and Undress for the Best Trip | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "We know you’re going to love your thrill filled vacation with your friends, but why not give them more to celebrate with your own bachelor party accessories?";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";

        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.currentDate = new Date();
        // $scope.subscribeData = {};
        // $scope.subscribeComplete = false;
        // $scope.subscribeSubmit = function(subscribeData) {
        //     console.log("subscribeData", subscribeData);
        //     NavigationService.subscribe(subscribeData, function(data) {
        //         console.log("data", data.value);
        //         if (data.value === true) {
        //             $scope.subscribeComplete = true;
        //         }
        //         $timeout(function() {
        //             $scope.subscribeComplete = false;
        //             $scope.subscribeData = {};
        //         }, 2000);
        //
        //     })
        // }

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };

        $scope.cartSubmit = function(input, myForm) {
            console.log('input', myForm);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;

            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.data.value);
                if (data.data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFun();

            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.onSubmitCart.close();
                $scope.cartData = {};
            }, 5000);
        }

        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivityPage = data.data.data.activities;
                console.log('$scope.getCartDataActivityPage', $scope.getCartDataActivityPage);

                // $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
                TemplateService.removeLoader();
            });
        }
        $scope.getCartFun();
        $scope.formComplete = false;
        $scope.enquiryData = {};
        $scope.enqSubmitPopup = function() {
            $scope.onSubmitEnq = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/enq.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        // $scope.enquirySubmit = function(input) {
        //     console.log('input', input);
        //     NavigationService.enquiryForm($scope.enquiryData, function(data) {
        //         console.log("data", data.value);
        //         if (data.value === true) {}
        //     });
        // }
        $scope.enquirySubmit = function(input, myForm) {
            // console.log('input', input);
            console.log('myForm', myForm);
            NavigationService.enquiryForm($scope.enquiryData, function(data) {
                console.log("data", data.data.value);
                myForm.cities.$touched = false;
                myForm.activitie.$touched = false;
                myForm.size.$touched = false;
                myForm.from.$touched = false;
                myForm.to.$touched = false;
                myForm.comments.$touched = false;
                myForm.name.$touched = false;
                myForm.phone.$touched = false;
                myForm.email.$touched = false;
                if (data.data.value === true) {
                    $scope.enquiryData = {};
                    console.log('inside ifff');
                    // $scope.submitEnq = true;
                    $scope.enqSubmitPopup();
                    $timeout(function() {
                        console.log('inside timeout');
                        $scope.onSubmitEnq.close();
                        // $scope.enquiryData = {};

                    }, 5000);
                }

            });

        }


    })
    .controller('HighrollersCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        $scope.template = TemplateService.changecontent("highrollers");
        $scope.menutitle = NavigationService.makeactive("Only the Best for the High Rollers | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Whether you’re looking for luxurious parties, hotels and stylish rides, we’ve got the ultimate package for you if your bachelor party theme is extravagant! ";
        TemplateService.keywords = "Bachelor trip, bachelor party theme ";

        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.currentDate = new Date();
        // $scope.subscribeData = {};
        // $scope.subscribeComplete = false;
        // $scope.subscribeSubmit = function(subscribeData) {
        //     console.log("subscribeData", subscribeData);
        //     NavigationService.subscribe(subscribeData, function(data) {
        //         console.log("data", data.value);
        //         if (data.value === true) {
        //             $scope.subscribeComplete = true;
        //         }
        //         $timeout(function() {
        //             $scope.subscribeComplete = false;
        //             $scope.subscribeData = {};
        //         }, 2000);
        //
        //     })
        // }

        $scope.submitCart = false;
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', myForm);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;

            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.data.value);
                if (data.data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFun();

            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.cartData = {};
                $scope.onSubmitCart.close();
            }, 5000);
        }

        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivityPage = data.data.data.activities;
                console.log('$scope.getCartDataActivityPage', $scope.getCartDataActivityPage);

                // $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
                TemplateService.removeLoader();
            });
        }
        $scope.getCartFun();
        $scope.formComplete = false;
        $scope.enquiryData = {};
        // $scope.enquirySubmit = function(input) {
        //     console.log('input', input);
        //     NavigationService.enquiryForm($scope.enquiryData, function(data) {
        //         console.log("data", data.value);
        //         if (data.value === true) {}
        //     });
        // }
        $scope.enqSubmitPopup = function() {
            $scope.onSubmitEnq = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/enq.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.enquirySubmit = function(input, myForm) {
            NavigationService.enquiryForm($scope.enquiryData, function(data) {
                console.log("data.value", data.data.value);
                myForm.cities.$touched = false;
                myForm.activitie.$touched = false;
                myForm.size.$touched = false;
                myForm.from.$touched = false;
                myForm.to.$touched = false;
                myForm.comments.$touched = false;
                myForm.name.$touched = false;
                myForm.phone.$touched = false;
                myForm.email.$touched = false;
                if (data.data.value === true) {
                    $scope.enquiryData = {};
                    $scope.enqSubmitPopup();
                    $timeout(function() {
                        console.log('inside timeout');
                        $scope.onSubmitEnq.close();
                    }, 5000);
                }
            });
        }

    })

.controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {


        $scope.template = TemplateService.changecontent("contactus");
        $scope.menutitle = NavigationService.makeactive("The Bachelor Trip | Contact Us");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Along with thrilling and chilling bachelor party packages and only high quality services, we provide you with help at every turn and point. So contact us!";
        TemplateService.keywords = "Bachelor trip, Contact Us";

        $scope.navigation = NavigationService.getnav();

    })
    .controller('AboutCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {


        $scope.template = TemplateService.changecontent("aboutus");
        $scope.menutitle = NavigationService.makeactive("The Bachelor Trip | About Us ");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Everyone knows what marriage means or implies and the fears you have. We’re here to let you vent in the form of the most epic bachelor parties of all time! ";
        TemplateService.keywords = "Bachelor trip, About Us";

        TemplateService.canonical = "aboutus";
        $scope.navigation = NavigationService.getnav();

    })
    .controller('ActivityCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {

        globalfunction.subscribeFun = function() {
            $scope.subscribeData = {};
            $scope.subscribeComplete = false;
            $scope.subscribeSubmit = function(subscribeData) {}
        }
        $scope.cartd = function() {
            modal = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/cartdialog.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.cartr = function() {
            modal = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/cartdialogremove.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.template = TemplateService.changecontent("activity");
        $scope.menutitle = NavigationService.makeactive("A Wise Variety of Activities only with The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Can’t decide where you want to go for your ultimate bachelor party? We have a list of activities for you to choose from like cruises, spas or scuba diving. ";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";

        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);

        $scope.changeDestination = function(id) {
            if (id) {
                console.log(id);
                $scope.saveDestId = id;
                NavigationService.getChangeDestination(id, function(data) {
                    $scope.changeDestData = data.data.data.Images;
                    $scope.showBttn = data.data.data.Images;
                    console.log('$scope.showBttn', $scope.showBttn.length);
                    var images = _.groupBy($scope.changeDestData, function(n) {
                        if (_.isEmpty(n.image1)) {
                            return "bigImage";
                        } else if (n.image1 && n.image2) {
                            return "bigImage";
                        } else {
                            return "smallImage";
                        }
                        // if (_.isEmpty(n.image1)) {
                        //     return "bigImage";
                        // } else {
                        //     return "smallImage";
                        // }
                    });

                    // if (images.smallImage) {
                    //     images.smallImage = _.chunk(images.smallImage, 3);
                    // }
                    // $scope.activityLand = images;
                    // if (images.smallImage.length > 0 && images.bigImage.length > 0) {
                    //     if (images.bigImage.length >= images.smallImage.length) {
                    //         $scope.activityLoop = _.times(images.bigImage.length, Number);
                    //     } else {
                    //         $scope.activityLoop = _.times(images.smallImage.length, Number);
                    //     }
                    // }
                    // console.log($scope.activityLoop);

                    console.log('serdtfyguhsertghjdrfghjedrfghj');
                    console.log('images', images);
                    if (images.smallImage) {
                        console.log(images.smallImage.length);
                        // if(images.smallImage.length > 2){
                        //   $scope.viewMore = true;
                        // }
                        images.smallImage = _.chunk(images.smallImage, 3);
                        console.log('images.smallImage', images.smallImage);
                        $scope.smallImageArray = _.cloneDeep(images.smallImage);
                        images.smallImage = _.take(images.smallImage, 2);
                        if (images.smallImage.length > 2) {
                            $scope.viewMore = true;
                        }

                    }
                    if (images.bigImage) {

                        console.log(images.bigImage.length);
                        $scope.bigImageArray = _.cloneDeep(images.bigImage);
                        images.bigImage = _.take(images.bigImage, 1);
                        if (images.bigImage.length > 2) {
                            $scope.viewMore = true;
                        }

                    }
                    // console.log('images.smallImage.length', images.smallImage.length);
                    $scope.activityLand = images;
                    if (images.bigImage && !images.smallImage) {
                        console.log('bigggg imggggg');
                        $scope.viewMore = false;
                        $scope.viewLess = false;
                        $scope.activityLoop = _.times(images.bigImage.length, Number);
                    } else {
                        console.log('i m smallll');
                        $scope.activityLoop = _.times(images.smallImage.length, Number);
                        // $scope.viewMore = false;
                        // $scope.viewLess = false;
                    }

                    console.log("bigImage", images.bigImage);

                    if (images.bigImage.length > 0 && images.smallImage.length > 0) {
                        if (images.bigImage.length >= images.smallImage.length) {
                            $scope.activityLoop = _.times(images.bigImage.length, Number);
                            console.log('if $scope.activityLoop', $scope.activityLoop);
                        } else {
                            $scope.activityLoop = _.times(images.smallImage.length, Number);
                            console.log('else $scope.activityLoop', $scope.activityLoop);
                        }
                    }
                    // TemplateService.removeLoader;
                });

            } else {
                console.log('m in else');
                $scope.viewLess = false;
                $scope.viewMore = false;
                $scope.loadLessActivities();
            }

        }

        NavigationService.ActivityLand(function(data) {
            $scope.Banner = data.data.data.Banner;
            TemplateService.removeLoader();
        });
        $scope.viewLess = false;
        $scope.viewMore = false;
        $scope.loadLessActivities = function() {
            console.log('$scope.saveDestId', $scope.saveDestId);
            $scope.saveDestId = undefined;
            // if($scope.saveDestId !=undefined){
            //     $scope.changeDestination($scope.saveDestId);
            //       $scope.changeDestination($scope.saveDestId);
            // }else{

            NavigationService.ActivityLand(function(data) {
                console.log(data);
                $scope.myDropdown = data.data.data.DestinationDropdown;
                $scope.showBttn = data.data.data.Images;
                console.log('$scope.showBttn', $scope.showBttn.length);
                var images = _.groupBy(data.data.data.Images, function(n) {
                    if (_.isEmpty(n.image1)) {
                        return "bigImage";
                    } else if (n.image1 && n.image2) {
                        return "bigImage";
                    } else {
                        return "smallImage";
                    }
                    // if (_.isEmpty(n.image1)) {
                    //     return "bigImage";
                    // } else {
                    //     return "smallImage";
                    // }
                });
                console.log('serdtfyguhsertghjdrfghjedrfghj');
                console.log('images', images);
                if (images.smallImage) {
                    console.log(images.smallImage.length);
                    if (images.smallImage.length > 6) {
                        $scope.viewMore = true;
                    }
                    images.smallImage = _.chunk(images.smallImage, 3);
                    console.log('images.smallImage', images.smallImage);
                    $scope.smallImageArray = _.cloneDeep(images.smallImage);
                    images.smallImage = _.take(images.smallImage, 2);
                }
                if (images.bigImage) {

                    console.log(images.bigImage.length);
                    if (images.bigImage.length > 2) {
                        $scope.viewMore = true;
                    }
                    $scope.bigImageArray = _.cloneDeep(images.bigImage);
                    images.bigImage = _.take(images.bigImage, 1);


                }
                // console.log(images.smallImage.length);
                // if(images.smallImage.length > 6 || images.bigImage.length > 2){
                //   console.log('hbnjbbbbbbbbbbbbbbbbbbbbbbbbbb');
                //   $scope.viewMore = true;
                // }else{
                //   $scope.viewMore = false;
                // }
                // console.log('images.smallImage.length', images.smallImage.length);
                $scope.activityLand = images;
                // if (images.bigImage.length <= 1 && !images.smallImage) {
                //   $scope.viewMore = false;
                //   $scope.viewLess = false;
                //   $scope.activityLoop = _.times(images.bigImage.length, Number);
                // }
                if (!images.bigImage && images.smallImage) {
                    console.log('i m smallll');
                    $scope.activityLoop = _.times(images.smallImage.length, Number);
                } else {
                    $scope.activityLoop = _.times(images.bigImage.length, Number);
                }
                // if(!images.bigImage && images.smallImage.length<=1) {
                //   console.log('i m smallll');
                //     $scope.activityLoop = _.times(images.smallImage.length, Number);
                // }
                // if(!images.smallImage && images.bigImage.length<=1){
                //   $scope.activityLoop = _.times(images.bigImage.length, Number);
                // }

                console.log("bigImage", images.bigImage);

                if (images.bigImage.length > 0 && images.smallImage.length > 0) {
                    if (images.bigImage.length >= images.smallImage.length) {
                        $scope.activityLoop = _.times(images.bigImage.length, Number);
                        console.log('if $scope.activityLoop', $scope.activityLoop);
                    } else {
                        $scope.activityLoop = _.times(images.smallImage.length, Number);
                        console.log('else $scope.activityLoop', $scope.activityLoop);
                    }
                }
                TemplateService.removeLoader();
            });
            // }
        }
        $scope.loadLessActivities();
        $scope.loadMoreActivities = function() {
            $scope.viewMore = false;
            $scope.viewLess = true;
            var images = [];
            images.smallImage = $scope.smallImageArray;
            images.bigImage = $scope.bigImageArray;
            $scope.activityLand = images;
            if (images.bigImage.length >= images.smallImage.length) {
                $scope.activityLoop = _.times(images.bigImage.length, Number);
                console.log('if $scope.activityLoop', $scope.activityLoop);
            } else {
                $scope.activityLoop = _.times(images.smallImage.length, Number);
                console.log('else $scope.activityLoop', $scope.activityLoop);
            }
            // TemplateService.removeLoader;
        }

        // =============== For Cart =================

        $scope.submitCart = false;
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', input);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.data.value);
                if (data.data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFun();
                $scope.cartData = {};
            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.onSubmitCart.close();
            }, 5000);
        }

        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivityPage = data.data.data.activities;
                console.log('$scope.getCartDataActivityPage', $scope.getCartDataActivityPage);

                // $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.addedSuccess = false;
        $scope.getCartFun();
        $scope.addTocartOnActivityPage = function(id, type) {
            console.log(id);
            var indexF = _.findIndex($scope.getCartDataActivityPage, function(key) {
                return key.activities._id == id;
            })
            if (indexF !== -1) {
                NavigationService.deleteCart(type, id, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFun();
                });
            } else {
                // $scope.addedSuccess = true;
                NavigationService.addCartActivity(id, type, function(data) {
                    if (data.data.value == true) {
                        $scope.addedSuccess = true;
                        $timeout(function() {
                            $scope.addedSuccess = false;
                        }, 2000);
                    }
                    $scope.getData = data;
                    console.log('$scope.getData', $scope.getData);
                    $scope.getCartFun();
                });
            }


        }

        $scope.isInWishlistActivityPage = function(id) {
            // console.log(id);
            var indexF = _.findIndex($scope.getCartDataActivityPage, function(key) {
                return key.activities._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }

        $scope.deleteCart = function(type, id) {
            console.log(type, id);
            NavigationService.deleteCart(type, id, function(data) {
                console.log('deleted', data);
                $scope.getCartFun();
            });
        }
        $scope.deleteCartAcco = function(type, name) {
            console.log(type, name);
            NavigationService.deleteCartAccomodation(type, name, function(data) {
                console.log('deleted', data);
                $scope.getCartFun();
            });
        }

        // ========= End Cart =============
    })
    .controller('StaticCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        globalfunction.subscribeFun = function() {
            $scope.subscribeData = {};
            $scope.subscribeComplete = false;
            $scope.subscribeSubmit = function(subscribeData) {}
        }
        $scope.template = TemplateService.changecontent("tbtstatic");
        $scope.menutitle = NavigationService.makeactive("The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Before the wedding bells signal the end of your bachelorhood, get out and take the trip of a lifetime! Your bachelor trip will be a once-in-a-lifetime event and we are here to make sure it turns out to be so crazy that you won't even be able to talk about it!";
        TemplateService.keywords = "bachelor trip, bachelor party, bachelor party destinations, bachelor trip destinations, bachelorhood, best party destinations";

        $scope.navigation = NavigationService.getnav();
        TemplateService.header = "views/static_header.html";
        TemplateService.footermenu = "views/static_footermenu.html";
        TemplateService.footer = "views/static_footer.html";
        $scope.flags = {};
        $scope.flags.thankyou = false;
        $scope.details = function() {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/details.html",
                scope: $scope,
                windowClass: "width80"
            });
        };
        $scope.formData = {};
        $scope.submitForm = function() {
            $scope.flags.thankyou = false;
            console.log("ffff", $scope.formData);
            NavigationService.submitForm($scope.formData, function(res) {
                if (res.value) {
                    $scope.flags.thankyou = true;
                    $scope.flags.mailform = true;
                    $scope.formData = {};
                } else {

                }
            });
        };
        //
        //         alert("hiiii");
        // console.log("?innnnnnnnn");
        // $scope.subscribeData = {};
        // $scope.subscribeComplete = false;
        // $scope.subscribeSubmit = function(subscribeData) {
        //     console.log("subscribeData", subscribeData);
        //     NavigationService.subscribe(subscribeData, function(data) {
        //         console.log("data", data.value);
        //         if (data.value === true) {
        //             $scope.subscribeComplete = true;
        //         }
        //         $timeout(function() {
        //             $scope.subscribeComplete = false;
        //             $scope.subscribeData = {};
        //         }, 2000);
        //
        //     })
        // }
    })

.controller('DestinationCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        globalfunction.subscribeFun = function() {
            $scope.subscribeData = {};
            $scope.subscribeComplete = false;
            $scope.subscribeSubmit = function(subscribeData) {}
        }
        $scope.template = TemplateService.changecontent("destination");
        $scope.menutitle = NavigationService.makeactive("The Best Bachelor Party Destinations | The Bachelor Trip ");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Before the wedding bells signal the end of your bachelorhood, get out and take the trip of a lifetime! Your bachelor trip will be a once-in-a-lifetime event and we are here to make sure it turns out to be so crazy that you won't even be able to talk about it!";
        TemplateService.keywords = "bachelor trip, bachelor party, bachelor party destinations, bachelor trip destinations, bachelorhood, best party destinations";

        $scope.navigation = NavigationService.getnav();

        //---seo---//
        //   TemplateService.canonical = "about-us";
        // TemplateService.description = "The best party destinations are now at your disposal for a crazy trip for you to truly let go. Let TBT plan the getaway you deserve, in the way you need. ";
        // TemplateService.keywords = "bachelor party destinations, best party destinations, bachelor trip destinations, party destinations, best bachelor party destinations";
        //---seo---//

        $scope.show = {};
        $scope.show = false;

        NavigationService.DestinationLand(function(data) {

            $scope.DestinationLand = data.data.data.popularDestination;
            $scope.DestinationLand = _.chunk(data.data.data.popularDestination, 2);
            console.log("$scope.DestinationLand", $scope.DestinationLand);
            $scope.allDestination = _.take(data.data.data.allDestination, 6);
            console.log("$scope.DestinationLand", $scope.allDestination);
            $scope.viewMoreDest = function() {
                $scope.show = true;
                $scope.allDestination = data.data.data.allDestination;
            };
            $scope.viewLessDest = function() {
                $scope.show = false;
                $scope.allDestination = _.take(data.data.data.allDestination, 6);
            }
        })


        // =============== For Cart =================
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', input);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.data.value);
                if (data.data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFunHeader();
                $scope.cartData = {};
            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.onSubmitCart.close();
            }, 5000);
        }
        $scope.getCartFunHeader = function() {
            console.log('inside gettttttt cart');
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFunHeader();
        $scope.deleteCart = function(type, id) {
            console.log(type, id);
            NavigationService.deleteCart(type, id, function(data) {
                console.log('deleted', data);
                $scope.getCartFunHeader();
            });
        }
        $scope.deleteCartAcco = function(type, name) {
            console.log(type, name);
            NavigationService.deleteCartAccomodation(type, name, function(data) {
                console.log('deleted', data);
                $scope.getCartFunHeader();
            });
        }

        // ======== End Cart =========
    })
    .controller('PattayaCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $uibModal, $filter, $sce) {
        globalfunction.subscribeFun = function() {
            $scope.subscribeData = {};
            $scope.subscribeComplete = false;
            $scope.subscribeSubmit = function(subscribeData) {}
        }
        $scope.currentStateId = $stateParams.id;
        // $scope.currentDate = $filter('date')(new Date(), 'yyyy MM dd');
        $scope.currentDate = new Date();
        console.log($scope.currentDate);
        $scope.cartd = function() {
            modal = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/cartdialog.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.cartr = function() {
            modal = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/cartdialogremove.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.template = TemplateService.changecontent("customdestination");
        $scope.menutitle = NavigationService.makeactive("customdestination");
        TemplateService.title = $scope.menutitle;
// console.log("TITLE",$scope.menutitle);
        // ------------switch case for desc and keyword ----------

        switch ($stateParams.id) {
            //3//
            case '5820d76b6f31bf5a0b18dbc8':
                $scope.menutitle = NavigationService.makeactive("Ideas for a Crazy Bachelor Night | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "With dungeons, sports and nightlife like no other, Amsterdam offers you what most cities cannot. Take a walk to the wild side this bachelor party with TBT. ";
                TemplateService.keywords = "bachelor night, bachelor party, bachelor trip, bachelor party themes, bachelor party games, bachelor party planning , bachelor party destinations in Amsterdam, bachelor party destinations Amsterdam";
               console.log("TITLE",$scope.menutitle);
                break;
                //4//
            case '5820e0666f31bf5a0b18dc42':
                $scope.menutitle = NavigationService.makeactive("Wild is the Bachelor Party Theme Here | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Your very own version of The Hangover is now ready to be experienced! Indulge in the streets of Bangkok as TBT takes care of your bachelor party planning. ";
                TemplateService.keywords = "bachelor night, bachelor party, bachelor trip, bachelor party themes, bachelor party games, bachelor party planning , bachelor party destinations in Bangkok, bachelor party destinations bangkok";
                break;
                //5//
            case '5820e05d6f31bf5a0b18dc40':
                $scope.menutitle = NavigationService.makeactive("Exotic Party Destinations for Bachelors | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Tired of the same old bachelor party ideas? Get a mix of cultures and adventures with a hint of sensuality in the city of Antalya in Turkey, only with TBT. ";
                TemplateService.keywords = "party destinations, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party bachelor party destinations in Turkey, bachelor party destinations Turkey";
                break;
                //6//
            case '5820e1e26f31bf5a0b18dcaa':
                $scope.menutitle = NavigationService.makeactive("Barcelona, The Ultimate Party Destination | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Need to unwind on a cruise or enjoy a fabulous spa day? At Barcelona, do this and much more with wines along the seas of Spain during your bachelor nights.";
                TemplateService.keywords = "party destinations, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations spain, bachelor party destinations in spain";
                break;
                //7//
                 case '5820e06e6f31bf5a0b18dc44':
                $scope.menutitle = NavigationService.makeactive("A Bachelor Party in Germany Style | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Leave behind the feminine and delicate on this bachelor party package in the heart of Germany. Smash some cars, party in a bus and drown in beer in Berlin. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations Germany, bachelor party destinations in Germany";
                break;
                   //8//
                 case '58635ec12550a629e7eecbd2':
                $scope.menutitle = NavigationService.makeactive("Push the Limits this Bachelor Party | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Go off the road and ride with style as you explore the excitement of Bratislava with your friends. Take a shot and dance till you drop on your bachelor party. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations Bratislava, bachelor party destinations in Bratislava";
                break;
                   //9//
                 case '5820e1d46f31bf5a0b18dca8':
                $scope.menutitle = NavigationService.makeactive("Adrenaline Filled Party Destinations | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Days and nights filled with laser tag, shooting ranges and exquisite shows just for you, that’s what a bachelor trip to Romania promises you with TBT! ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations Romania, bachelor party destinations in Romania";
                break;
                  //10//
                 case '5820e1e76f31bf5a0b18dcac':
                $scope.menutitle = NavigationService.makeactive("Budapest Bachelor Party Packages | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Sink into the folds of excitement in the city of Budapest. Dance in nightclubs and enjoy the thrill of battle fields with TBT’s bachelor party themes. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations Budapest, bachelor party destinations in Budapest";
                break;
                  //11//
                 case '5820e08f6f31bf5a0b18dc4a':
                $scope.menutitle = NavigationService.makeactive("Hola to the Best Party Destination | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Dive into the deep seas and witness underwater life with scuba diving at Mexico! Pristine beaches and cabaret shows will add to your bachelor nights. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor nights, bachelor party destinations Mexico, bachelor party destinations in Mexico";
                break;
                   //12//
                 case '5811d6b1b0e6dc59847be39a':
                $scope.menutitle = NavigationService.makeactive("The Bachelor Party Theme is Luxury | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Want to feel pampered before the big day? It doesn’t get better than Dubai, the best bachelor trip destination, with limos, hot air balloons and yacht parties. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations Dubai, bachelor party destinations in Dubai";
                break;
                   //13//
                 case '5820e1486f31bf5a0b18dc80':
                $scope.menutitle = NavigationService.makeactive("The Beach Bachelor Party Packages | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Casinos and clear blue beaches adorned with beautiful women. If that is the ideal bachelor party for you, Dubrovnik is the destination for you to let go. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party Bachelor party packages, bachlor party , bachlor party package, bachelor party destinations Dubrovnik, bachelor party destinations in Dubrovnik";
                break;
                  //14//
                 case '5820d8e66f31bf5a0b18dbed':
                $scope.menutitle = NavigationService.makeactive("Go Hard or Go Home in the Port of Poland | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Break out of your shell and embrace the raw energetic side of you with bachelor party games like no other. Gdansk gives you jet skis, shooting and more. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party Bachelor party packages ,Bachelor trip, bachelor party games, bachelor party destinations Poland, bachelor party destinations in Poland";
                break;
                  //15//
                 case '5820e0a96f31bf5a0b18dc56':
                $scope.menutitle = NavigationService.makeactive("The Ultimate Stag Weekend | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Need the best of stag weekends with your boys to get away from life? Hamburg is the best party destination for you! Cruise through with the ladies this trip. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party  ,Bachelor trip, best party destination , bachelor party destinations Hamburg, bachelor party destinations in Hamburg";
                break;
                  //16//
                 case '5820e0b36f31bf5a0b18dc58':
                $scope.menutitle = NavigationService.makeactive("Come and Live it Up at Ibiza with Style | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Gorgeous beaches, stunning women and a unwavering appetite for fun and partying, Ibiza is an extremely loved and popular party destination for stag trips. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party  Bachelor trip, party destination , bachelor party destinations Ibiza, bachelor party destinations in Ibiza";
                break;
                   //17//
                 case '5820e1fe6f31bf5a0b18dcb8':
                $scope.menutitle = NavigationService.makeactive("Party with the Boys in Istanbul| The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Nightclubs and discos, parties and parasailing, Istanbul gives you this and more. The heart of Turkey, the city is perfect for your fun bachelor party theme. ";
                TemplateService.keywords = "bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, Bachelor trip, bachelor party theme , bachelor party destinations Istanbul, bachelor party destinations in Istanbul";
                break;
                   //18//
                 case '5820d6aa6f31bf5a0b18dba2':
                $scope.menutitle = NavigationService.makeactive("Unwind in the Depths of Jordan, Africa| The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Heal at the Dead Sea or lose yourself in a camp in the desert in Jordan on your bachelor party. Take a new route on a trip before you start your new chapter. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations Jordan, bachelor party destinations in Jordan";
                break;
                   //19//
                 case '5820e0cc6f31bf5a0b18dc5b':
                $scope.menutitle = NavigationService.makeactive("Party King Size this Trip at Kiev| The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Does your ideal bachelor party package include partying after midnight, swanky bars and sexy boat parties? Then Kiev, Ukraine is the place for your boys!  ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations Kiev ,bachelor party destinations in Kiev";
                break;
                   //20//
                 case '5820e1696f31bf5a0b18dc8c':
                $scope.menutitle = NavigationService.makeactive("Lose your Senses on the Island | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "One of the best bachelor party destinations in the world, Koi Samui is a stunning island. Brilliant beaches and sensual nightlife make it worth the visit.";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations Koi Samui ,bachelor party destinations in Koi Samui";
                break;
                   //21//
                 case '5820d9736f31bf5a0b18dc0a ':
                $scope.menutitle = NavigationService.makeactive("Fun Stag Weekends with the Polish | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "If you’re in need for a bachelor party destination that caters to everyone’s needs, Karkow is the ideal trip. With something to offer everyone, enjoy Poland. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations Poland, bachelor party destinations in Poland";
                break;

                  //22//
                 case '5820e17a6f31bf5a0b18dc8f':
                $scope.menutitle = NavigationService.makeactive("Nothing like Anything in Vegas | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Everyone knows that what happens in Vegas, stays in Vegas. Because the things you can do here on a bachelor night, will never be forgotten by anyone. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Vegas,, bachelor party destinations Vegas";
                break;
                  //23//
                 case '5820e1a86f31bf5a0b18dca0':
                $scope.menutitle = NavigationService.makeactive("Beautiful Nights Under the Lisbon Skies | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Even though it’s most visited on family vacations, do not underestimate the excitement Lisbon has to offer you. A great party destination, try it out!";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Lisbon bachelor party destinations Lisbon";
                break;
                  //24//
                 case '5820d6ed6f31bf5a0b18dbb5':
                $scope.menutitle = NavigationService.makeactive("Make it the Best Trip with Macau| The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "A trip down the adrenaline filled joyride that is Macau for the best bachelor party! Enjoy water sports and the airsoft war games or unwind at a luxurious spa. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party,  bachelor party destinations in Macau bachelor party destinations Macau";
                break;
                  //25//
                 case '5820e2136f31bf5a0b18dcc6':
                $scope.menutitle = NavigationService.makeactive("See the Madness in the City of Madrid | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "A bachelor party destination like no other, Madrid promises you the most sinful experience of all. Music, wrestling and beautiful women, need any more reasons?";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Madrid bachelor party destinations Madrid";
                break;
                  //26//
                 case '5820e1b06f31bf5a0b18dca2':
                $scope.menutitle = NavigationService.makeactive("Come, Party it up in the Philippines| The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "A city filled with youth, a zest for life and a zeal for adventure, the Philippines is the perfect bachelor party destination for a memorable vacation. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Philippines bachelor party destinations Philippines";
                break;
                  //27//
                 case '5820e1bf6f31bf5a0b18dca4':
                $scope.menutitle = NavigationService.makeactive("Lose Your Marbles in Spain | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Go off the road this one last time on your bachlor night! Exciting packages with caving, jet lev and great poker nights, doesn’t it sound fantastic in Spain?";
                TemplateService.keywords = "Bachelor trip, bachlor night, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Spain , bachelor party destinations Spain,";
                break;
                  //28//
                 case '5820e2196f31bf5a0b18dcc8':
                $scope.menutitle = NavigationService.makeactive("Magic in the City of Easy Miami | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "A heaven for every stag getaway, you can leave every worry and problem behind because that’s what Miami will do to you on your exciting bachelor party. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Miami, bachelor party destinations Miami";
                break;
                 //29//
                 case '5820e1c66f31bf5a0b18dca6':
                $scope.menutitle = NavigationService.makeactive("Madness in the Midst of Montreal | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Who ever said the Canadians do not know how to party till dawn? Montreal is filled with sensual sushi and thrilling activities perfect for you bachelor night!";
                TemplateService.keywords = "bachelor night , Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party ,bachelor party destinations in Montreal , bachelor party destinations Montreal";
                break;
                 //30//
                 case '5820e2216f31bf5a0b18dcca':
                $scope.menutitle = NavigationService.makeactive("Crazy Nights were made for Morocco | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Exotic and exciting events which will give you the adrenaline rush of a lifetime await you in one of the best party destinations in the world, Morocco!";
                TemplateService.keywords = "best party destination in the world , Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Morocco ,bachelor party destinations Morocco";
                break;
                //31//
                 case '5820e0d56f31bf5a0b18dc5d':
                $scope.menutitle = NavigationService.makeactive("Make the most of your Nights in Moscow | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "If you’re in search for the best party destination and a wicked joyride for you and your friends, plan a great night in Moscow for the ultimate Russian beauty. ";
                TemplateService.keywords = "best party destination , Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Moscow, bachelor party destinations Moscow";
                break;
                //32//
                 case '5820e1516f31bf5a0b18dc82':
                $scope.menutitle = NavigationService.makeactive("Celebrate with the Germany Girls | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Do you and your lads love luxury and cheap thrills at the same time? Limousines and beautiful women all around that’s the ideal bachelor party in Munich!";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Germany, bachelor party destinations Germany";
                break;
                //33//
                 case '5820e2466f31bf5a0b18dcd2':
                 $scope.menutitle = NavigationService.makeactive("Gear up for your Greek Adventure| The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Why watch yourself on your trip of a lifetime that will only come once? A great party destination, Mykonos offers helicopter rides and wind surfing as well!";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Greece, bachelor party destinations Greece";
                break;
                //34//
                 case '5820e22b6f31bf5a0b18dccc':
                $scope.menutitle = NavigationService.makeactive("Now Paint the Town Red in Pattaya | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Known as the eternal land of sins for stags, Pattaya is definitely for the faint hearted. Filled with exotic activities, it’s a bachelor night to remember. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Pattaya ,bachelor party destinations Pattaya";
                break;
                //35//
                 case '5820e2316f31bf5a0b18dcce':
                $scope.menutitle = NavigationService.makeactive("Beer, beaches and babes in Phuket | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Whether you want the thrills or to just chill, the land of Phuket has so much to offer you for you bachelor party package along with a wicked nightlife. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Phuket, bachelor party destinations Phuket";
                break;
                  //36//
                 case '5820e0dd6f31bf5a0b18dc5f':
                 $scope.menutitle = NavigationService.makeactive("Experience the Beauty of Prague | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "When you fly down to the beautiful city of Prague for a great bachelor party, be ready for intense poker nights, vintage cars, lavish casinos and beer spas! ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party  , bachelor party destinations in Prague, bachelor party destinations Prague";
                break;
                  //37//
                 case '5820e1846f31bf5a0b18dc91':
                  $scope.menutitle = NavigationService.makeactive("Explore the Wild Side of Latvia Riga | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Dive into the deep with the luscious nightlife of Latvia Riga with your friends and indulge in bachelor party games like no other with great beers and meals. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Latvia Riga, bachelor party destinations Latvia Riga";
                break;
                  //38//
                 case '5820e2386f31bf5a0b18dcd0':
                  $scope.menutitle = NavigationService.makeactive("Save the Energy and Fun for Singapore| The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Indoor sky-diving, formula one adventures, night safaris, do these activities sound interesting? If yes, your bachelor party theme should be Singapore!";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Singapore, bachelor party destinations Singapore";
                break;
                  //39//
                 case '5820e0e56f31bf5a0b18dc61':
                  $scope.menutitle = NavigationService.makeactive("The Sofia Stag Weekend Getaway | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Sofia brings you an enthralling experience and thrills which will be etched in your memory forever as one of the best vacations and bachelor nights ever. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party ";
                break;
                  //40//
                 case '5820e0fc6f31bf5a0b18dc63':
                   $scope.menutitle = NavigationService.makeactive("Savour the Beauty of Pure St. Petersburg | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "The old city of Russia, St. Petersburg, treats every bachelor party with care, love and excitement. A world class destination, enjoy this gorgeous trip now. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Russia, bachelor party destinations Russia";
                break;
                  //41//
                 case '5820e13f6f31bf5a0b18dc7e':
                   $scope.menutitle = NavigationService.makeactive("Beautiful Scenic Views in Bulgaria | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Dying to get out of the mundane and stretch out on sandy beaches and chill next to serene waters? Go to Bulgaria for a relaxed bachlor party with the lads. ";
                TemplateService.keywords = "bachlor party ,Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party ,bachelor party destinations in Bulgaria, bachelor party destinations Bulgaria";
                break;
                  //42//
                 case '5820e1066f31bf5a0b18dc65':
                  $scope.menutitle = NavigationService.makeactive("The Wonders of the Small Town Estonia | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Don’t judge a town by its size boys. In this tiny area in Estonia lies a paradise with more women and fun then you can handle for your bachelor night. ";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party, bachelor party destinations in Estonia, bachelor party destinations Estonia";
                break;
                  //43//
                 case '5820e10e6f31bf5a0b18dc67':
                   $scope.menutitle = NavigationService.makeactive("Take your Friends Today to Tokyo | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Whether you’re into sumo wrestling, mind-blowing sushi or the highest bungee jumping point in the world, Tokya has so much to offer as a party destination!";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Tokyo, bachelor party destinations Tokyo";
                break;
                  //44//
                 case '5820d9c56f31bf5a0b18dc1d':
                $scope.menutitle = NavigationService.makeactive("Pay a Visit to Warsaw, Poland Today | The Bachelor Trip");
                TemplateService.title = $scope.menutitle;
                TemplateService.description = "Pamper yourself and your friends in the city of Warsaw with its amazing nightlife, high octane clubs and classy dance floors at this bachelor party destination.";
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , bachelor party destinations in Poland, bachelor party destinations Poland";
                break;
                  //45//
                 case '5820e12a6f31bf5a0b18dc79':
                $scope.menutitle = NavigationService.makeactive("  You can Carry on Partying in Croatia | The Bachelor Trip ");
                TemplateService.title = $scope.menutitle;
                TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party , , bachelor party destinations in Croatia, bachelor party destinations Croatia";
                break;
            default:
                TemplateService.description = "Before the wedding bells signal the end of your bachelorhood, get out and take the trip of a lifetime! Your bachelor trip will be a once-in-a-lifetime event and we are here to make sure it turns out to be so crazy that you won't even be able to talk about it!";
                TemplateService.keywords = "bachelor trip, bachelor party, bachelor party destinations, bachelor trip destinations, bachelorhood, best party destinations";
        }

        // ---------end of suitch case---------

        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.tabs = 'az';
        $scope.classp = 'active-tab';
        $scope.classv = '';

        $scope.oneAtATime = true;
        $scope.pageVariables = {};
        TemplateService.menu = "";

        $scope.accordian = [];
        $scope.accordian.push({
            isFirstOpen: false,
            isFirstDisabled: false
        });

        // $scope.item = {
        //   get: function(data) {
        //       return data;
        //   }
        // };


        if ($stateParams.id == '5820d76b6f31bf5a0b18dbc8') {

        }


        $scope.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
        };
        $scope.headerCartOpen = function() {
            console.log('ddddddddddddddd');
            $scope.mycart10 = false;
            $scope.enquirybtn10 = true;
        }
        globalfunction.headerCartOpen = function() {

            $scope.headerCartOpen();
        }
        $scope.headerCartOpenUp = function() {
            $scope.mycart10 = false;
            $scope.enquirybtn10 = false;
        }
        globalfunction.headerCartOpenUp = function() {

            $scope.headerCartOpenUp();
        }
        $scope.headerCartOpenCtrl = function() {
            console.log('yes hereeeeee');
            $scope.mycart10 = true;
            $scope.enquirybtn10 = false;
        }
        globalfunction.headerCartOpenCtrl = function() {

            $scope.headerCartOpenCtrl();
        }
        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivityPattayaPage = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                // console.log('accmoddddddddddd', $scope.getAccomodation10);
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                // console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
                TemplateService.removeLoader();
            });

        }
        $scope.getCartFun();
        $scope.totalCount = 0;

        $scope.addTocartOnPackage = function(id, type) {
            console.log(id);
            var indexF = _.findIndex($scope.getCartDataPackage10, function(key) {
                return key.package._id == id;
            })
            if (indexF !== -1) {
                NavigationService.deleteCart(type, id, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFun();
                });
            } else {
                NavigationService.addCartPackage(id, type, function(data) {
                    $scope.getData = data;
                    console.log('$scope.getData', $scope.getData);
                    $scope.getCartFun();
                });
            }
        }

        $scope.isInWishlistActivity = function(id) {
            var indexF = _.findIndex($scope.getCartDataActivityPattayaPage, function(key) {
                return key.activities._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.isInWishlistPackage = function(id) {
            var indexF = _.findIndex($scope.getCartDataPackage10, function(key) {
                return key.package._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.addedSuccessPattaya = false;
        $scope.addTocartOnActivity = function(id, type) {
            console.log(id);
            var indexF = _.findIndex($scope.getCartDataActivityPattayaPage, function(key) {
                return key.activities._id == id;
            })
            if (indexF !== -1) {
                NavigationService.deleteCart(type, id, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFun();
                });
            } else {
                NavigationService.addCartActivity(id, type, function(data) {
                    if (data.data.value == true) {
                        $scope.addedSuccessPattaya = true;
                        $timeout(function() {
                            $scope.addedSuccessPattaya = false;
                        }, 2000);
                    }
                    $scope.getData = data;
                    console.log('$scope.getData', $scope.getData);
                    $scope.getCartFun();
                });
            }
        }

        $scope.viewLess = false;
        $scope.viewMore = false;
        $scope.more = false;
        $scope.checkIt = {};
        $scope.deleteCart = function(type, id) {
            console.log(type, id);
            NavigationService.deleteCart(type, id, function(data) {
                console.log('deleted', data);
                $scope.getCartFun();
            });
        }
        $scope.deleteCartAcco = function(type, name) {
            console.log(type, name);
            NavigationService.deleteCartAccomodation(type, name, function(data) {
                console.log('deleted', data);
                $scope.getCartFun();
            });
        }
        $scope.loadLessPackage = function() {
            var myarr = [];
            NavigationService.cityDetails($stateParams.id, function(data) {

                $scope.getTitle = data.data.data.getTitle;
                _.each($scope.getTitle, function(n) {
                    // console.log(n._id);
                    NavigationService.DestinationContent(n._id, function(data) {
                        // console.log('inside service');
                        // console.log(data.data.data.getTitle);
                        // console.log(data.data.data.getTitle[0]);
                        n.description = data.data.data.getTitle[0].description;
                        if (data.data.data.getTitle[0].name) {
                            n.name1 = data.data.data.getTitle[0].name;
                        }
                    });
                })
                $scope.getDestination = data.data.data.getDestination;
                console.log('$scope.myvideoUrl', data.data.data.getDestination.video);
                $scope.getUrl = data.data.data.getDestination.video;
                $scope.getPackage = data.data.data.getPackage;
                console.log('$scope.getPackage', $scope.getPackage);
                if (data.data.data.getPackage.length > 8) {
                    $scope.viewMore = true;
                }
                $scope.getPackageArr = _.cloneDeep($scope.getPackage);
                // $scope.viewMore = true;
                $scope.getPackage = _.take($scope.getPackage, 8);
            });


        };

        $scope.loadLessPackage();

        $scope.selectedAll = {};
        $scope.selectedAll.location = true;
        $scope.checkAllLocation = function() {
            // var toggleStatusLocation = $scope.selectedAll.location;
            // _.forEach($scope.locationArr, function(location) {
            //     location.model = toggleStatusLocation;
            // });
            $scope.searchAllFilter();
        };
        // $scope.locationArr = [];
        $scope.locationArr = [{
            value: 'day',
            model: true,
            image: 'frontend/img/Vector-Smart-Object1.png',
            imageClass: ""
        }, {
            value: 'night',
            model: true,
            image: 'frontend/img/Vector.png',
            imageClass: 'vector'
        }];
        $scope.noResult = false;
        $scope.viewMoreActivity = false;
        $scope.viewLessActivity = false;
        $scope.day = {};
        $scope.night = {};
        $scope.day.model = false;
        $scope.night.model = false;
        $scope.searchAllFilter = function() {

            if ($scope.selectedAll.location == true) {
                $scope.day.model = false;
                $scope.night.model = false;
                var dataToSend = {
                    destination: $stateParams.id,
                    type: ["day", "night"]
                }
            } else {
                $scope.day.model = true;
                $scope.night.model = true;
                var dataToSend = {
                    destination: $stateParams.id,
                    type: []
                }
            }
            NavigationService.getSearch(dataToSend, function(data) {
                console.log('DTAA TO SEND', dataToSend);
                if (data.data.data.Category.length > 8) {
                    $scope.viewMoreActivity = true;
                }

                if (data.data.data.Category.length == 0) {
                    $scope.viewMoreActivity = false;
                    $scope.noResult = true;
                } else {

                    $scope.noResult = false;
                    $scope.getActivity = data.data.data.Category;
                    console.log('data.data.data', $scope.getActivity.length);
                    $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                    console.log('  $scope.getActivityArr', $scope.getActivityArr);
                    $scope.getActivity = _.take($scope.getActivity, 8);
                }
            });
        };
        $scope.searchDay = function() {
            console.log('dayclick');
            $scope.night.model = false;
            $scope.day.model = true;
            $scope.selectedAll.location = false;
            var dataToSend = {
                destination: $stateParams.id,
                type: ["day"]
            }
            NavigationService.getSearch(dataToSend, function(data) {
                console.log('DTAA TO SEND', dataToSend);
                if (data.data.data.Category.length > 8) {
                    $scope.viewMoreActivity = true;
                }

                if (data.data.data.Category.length == 0) {
                    $scope.viewMoreActivity = false;
                    $scope.noResult = true;
                } else {

                    $scope.noResult = false;
                    $scope.getActivity = data.data.data.Category;
                    console.log('data.data.data', $scope.getActivity.length);
                    $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                    console.log('  $scope.getActivityArr', $scope.getActivityArr);
                    $scope.getActivity = _.take($scope.getActivity, 8);
                }
            });
        }
        $scope.searchNight = function() {
            console.log('nightclick');
            $scope.day.model = false;
            console.log('$scope.day.model', $scope.day.model);
            $scope.night.model = true;

            $scope.selectedAll.location = false;
            var dataToSend = {
                destination: $stateParams.id,
                type: ["night"]
            }
            NavigationService.getSearch(dataToSend, function(data) {
                console.log('DTAA TO SEND', dataToSend);
                if (data.data.data.Category.length > 8) {
                    $scope.viewMoreActivity = true;
                }

                if (data.data.data.Category.length == 0) {
                    $scope.viewMoreActivity = false;
                    $scope.noResult = true;
                } else {

                    $scope.noResult = false;
                    $scope.getActivity = data.data.data.Category;
                    console.log('data.data.data', $scope.getActivity.length);
                    $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                    console.log('  $scope.getActivityArr', $scope.getActivityArr);
                    $scope.getActivity = _.take($scope.getActivity, 8);
                }
            });
        }

        $scope.searchAllFilter();
        $scope.loadMorePackage = function() {
            console.log('inside loadmore fun');
            $scope.viewMore = false;
            $scope.viewLess = true;
            $scope.more = true;
            $scope.viewMoreActivity = false;
            $scope.viewLessActivity = true;
            $scope.getPackage = $scope.getPackageArr;
            $scope.getActivity = $scope.getActivityArr;
        };
        $scope.open4 = function() {
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/thankYou.html",
                scope: $scope
            });
        };
        $scope.groups = [{
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        }, {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }];
        $scope.formComplete = false;
        $scope.enquiryData = {};
        $scope.submitEnq = false;
        $scope.enqSubmitPopup = function() {
            $scope.onSubmitEnq = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/enq.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        // $scope.enquirySubmit = function(input, myForm) {
        //     console.log('input', input);
        //     NavigationService.enquiryForm($scope.enquiryData, function(data) {
        //         console.log("data", data.value);
        //         myForm.cities.$touched = false;
        //         myForm.activitie.$touched = false;
        //         myForm.size.$touched = false;
        //         myForm.from.$touched = false;
        //         myForm.to.$touched = false;
        //         myForm.comments.$touched = false;
        //         myForm.name.$touched = false;
        //         myForm.phone.$touched = false;
        //         myForm.email.$touched = false;
        //         if (data.value === true) {
        //             $scope.enquiryData = {};
        //             $scope.submitEnq = true;
        //         }
        //
        //     });
        //     $timeout(function() {
        //         console.log('inside timeout');
        //         $scope.submitEnq = false;
        //         // $scope.enquiryData = {};
        //
        //     }, 5000);
        // }
        $scope.enquirySubmit = function(input, myForm) {
            console.log('input', input);
            NavigationService.enquiryForm($scope.enquiryData, function(data) {
                console.log("data", data.data.value);
                myForm.cities.$touched = false;
                myForm.activitie.$touched = false;
                myForm.size.$touched = false;
                myForm.from.$touched = false;
                myForm.to.$touched = false;
                myForm.comments.$touched = false;
                myForm.name.$touched = false;
                myForm.phone.$touched = false;
                myForm.email.$touched = false;
                if (data.data.value === true) {
                    $scope.enquiryData = {};
                    console.log('inside ifff');
                    // $scope.submitEnq = true;
                    $scope.enqSubmitPopup();
                    $timeout(function() {
                        console.log('inside timeout');
                        $scope.onSubmitEnq.close();
                        // $scope.enquiryData = {};

                    }, 5000);
                }

            });

        }

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };
        $scope.DestinationTitle = '';
        $scope.openMe = false;
        $scope.goToFunction = function(id) {
            $scope.DestinationTitle = '';
            NavigationService.DestinationContent(id, function(data) {
                $scope.DestinationTitle = data.data.data.getTitle;
                $scope.openMe = true;
                console.log("$scope.DestinationTitle", $scope.DestinationTitle[0]);
            });
        };
        $scope.cart = false;
        $scope.tabchanges = function(tabs, a) {
            $scope.tabs = tabs;
            if (a == 1) {
                $scope.classp = "active-tab";
                $scope.classv = '';
            } else {
                $scope.classp = '';
                $scope.classv = "active-tab";
            }
        };

        $scope.addTocart = function(data) {
            console.log("data", data);

        }

        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', input);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.data.value);
                if (data.data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFun();
                $scope.cartData = {};
            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.onSubmitCart.close();
            }, 5000);
        }

    })
    .controller('Pattaya2Ctrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $uibModal) {
        globalfunction.subscribeFun = function() {
            $scope.subscribeData = {};
            $scope.subscribeComplete = false;
            $scope.subscribeSubmit = function(subscribeData) {}
        }
        $scope.currentDate = new Date();
        $scope.template = TemplateService.changecontent("pakage");
        $scope.menutitle = NavigationService.makeactive("Package");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Before the wedding bells signal the end of your bachelorhood, get out and take the trip of a lifetime! Your bachelor trip will be a once-in-a-lifetime event and we are here to make sure it turns out to be so crazy that you won't even be able to talk about it!";
        TemplateService.keywords = "bachelor trip, bachelor party, bachelor party destinations, bachelor trip destinations, bachelorhood, best party destinations";

        $scope.navigation = NavigationService.getnav();
        $scope.headerCartOpen = function() {
            console.log('ddddddddddddddd');
            $scope.mycart10 = false;
            $scope.enquirybtn10 = true;
        }
        globalfunction.headerCartOpen = function() {

            $scope.headerCartOpen();
        }
        $scope.headerCartOpenUp = function() {
            $scope.mycart10 = false;
            $scope.enquirybtn10 = false;
        }
        globalfunction.headerCartOpenUp = function() {

            $scope.headerCartOpenUp();
        }
        $scope.headerCartOpenCtrl = function() {
            console.log('yes hereeeeee');
            $scope.mycart10 = true;
            $scope.enquirybtn10 = false;
        }
        globalfunction.headerCartOpenCtrl = function() {

            $scope.headerCartOpenCtrl();
        }

        $scope.data = [{
            img: "img/p1.jpg",
            day: "Day 1",
            li: "Welcome by our guide at the airport",
            li: "Hotel Transfer (Minivan)",
            li: "Breakfast along the way",
            li: "Pool Party",
            li: "Lunch",
            li: "VIP night club",

        }, {
            img: "img/p2.jpg",
            day: "Day 2",
            li: "Welcome by our guide at the airport",
            li: "Hotel Transfer (Minivan)",
            li: "Breakfast along the way",
            li: "Pool Party",
            li: "Lunch",

        }, {
            img: "img/p3.jpg",
            day: "Day 3",
            li: "Welcome by our guide at the airport",
            li: "Hotel Transfer (Minivan)",
            li: "Breakfast along the way",
            li: "Pool Party",

        }, {
            img: "img/p4.jpg",
            day: "Day 4",
            li: "Welcome by our guide at the airport",
            li: "Hotel Transfer (Minivan)",
            li: "Breakfast along the way",
            li: "Pool Party",
            li: "Lunch",
            li: "VIP night club",

        }, {
            img: "img/p1.jpg",
            day: "Day 5",
            li: "Welcome by our guide at the airport",
            li: "Hotel Transfer (Minivan)",
            li: "Breakfast along the way",
            li: "Pool Party",
            li: "Lunch",
            li: "VIP night club",

        }]

        NavigationService.RestApiPattaya2($stateParams.id, function(data) {
            $scope.myIdPattaya2 = $stateParams.id;
            console.log(data.data.data);
            $scope.getPattaya2 = data.data.data.packageDetails;
            console.log("$scope.getPattaya2", $scope.getPattaya2);
        })

        $scope.formComplete = false;
        $scope.enquiryData = {};
        $scope.enqSubmitPopup = function() {
            $scope.onSubmitEnq = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/enq.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        // $scope.enquirySubmitPatt2 = function(input) {
        //         console.log('input', input);
        //         NavigationService.enquiryForm($scope.enquiryData, function(data) {
        //             console.log("data", data.value);
        //             if (data.value === true) {}
        //         });
        //     }
        $scope.enquirySubmit = function(input, myForm) {
                console.log('input', input);
                NavigationService.enquiryForm($scope.enquiryData, function(data) {
                    console.log("data", data.value);
                    myForm.cities.$touched = false;
                    myForm.activitie.$touched = false;
                    myForm.size.$touched = false;
                    myForm.from.$touched = false;
                    myForm.to.$touched = false;
                    myForm.comments.$touched = false;
                    myForm.name.$touched = false;
                    myForm.phone.$touched = false;
                    myForm.email.$touched = false;
                    if (data.value === true) {
                        $scope.enquiryData = {};
                        console.log('inside ifff');
                        // $scope.submitEnq = true;
                        $scope.enqSubmitPopup();
                        $timeout(function() {
                            console.log('inside timeout');
                            $scope.onSubmitEnq.close();
                            // $scope.enquiryData = {};

                        }, 5000);
                    }

                });

            }
            // =============== For Cart =================
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', input);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFunPattaya2();
                $scope.cartData = {};
            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.onSubmitCart.close();
            }, 5000);
        }
        $scope.getCartFunPattaya2 = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFunPattaya2();


        $scope.addTocartOnPackagePattaya2 = function(id, type) {
            console.log(id);
            var indexF = _.findIndex($scope.getCartDataPackage10, function(key) {
                return key.package._id == id;
            })
            if (indexF !== -1) {
                NavigationService.deleteCart(type, id, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFunPattaya2();
                });
            } else {
                NavigationService.addCartPackage(id, type, function(data) {
                    $scope.getData = data;
                    console.log('$scope.getData', $scope.getData);
                    $scope.getCartFunPattaya2();
                });
            }
        }
        $scope.isInWishlistPackagePattaya2 = function(id) {
            var indexF = _.findIndex($scope.getCartDataPackage10, function(key) {
                return key.package._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.deleteCart = function(type, id) {
            console.log(type, id);
            NavigationService.deleteCart(type, id, function(data) {
                console.log('deleted', data);
                $scope.getCartFunPattaya2();
            });
        }
        $scope.deleteCartAcco = function(type, name) {
                console.log(type, name);
                NavigationService.deleteCartAccomodation(type, name, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFunPattaya2();
                });
            }
            // ============== End Cart ==============
    })
    .controller('Whats-hot-moreCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
       $scope.template = TemplateService.changecontent("whats-hot-more");
        $scope.menutitle = NavigationService.makeactive("Know What’s Hot in the Year of 2017 | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "For the best party destinations, you should know the where the best upcoming parties are at and when. Check out Tomorrowland, the Grand Prix or luxury cruises.";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";
        $scope.navigation = NavigationService.getnav();

        $scope.tabs = 'az';
        $scope.classp = 'active-tab';
        $scope.classv = '';

        $scope.oneAtATime = true;
        $scope.tabchanges = function(tabs, a) {

            $scope.tabs = tabs;
            if (a == 1) {

                $scope.classp = "active-tab";
                $scope.classv = '';

            } else {

                $scope.classp = '';
                $scope.classv = "active-tab";
            }
        };


        //=======switch======//
        switch($stateParams.id){
            //53//
        case'5839349fc4c7854ddcbdfa6a':
        $scope.menutitle = NavigationService.makeactive("Go Mad at the Hat Rin Full Moon Party | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Beautiful white sand beaches and warm nights with the full moon, can it get better? Add neon lights and techno music and you’ve got your bachelor night! ";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";
        break;
        //54//
        case'58394126c4c7854ddcbdfca6':
        $scope.menutitle = NavigationService.makeactive("Every Guy’s Dream is the Grand Prix | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "If you and your buddies are hard-core Formula One fans and have been dying to see a Grand Prix, this is the best bachelor party package for you in Budapest! ";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";
        break;
         //55//
        case'5839433cc4c7854ddcbdfd14':
        $scope.menutitle = NavigationService.makeactive("Let’s Start the New Year with a Bang | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "A new year means new experiences with your best friends that no one will ever forget. Get that and more with a party in Macau on your bachelor night. ";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";
        break;

         //56//
        case'58394561c4c7854ddcbdfd38':
        $scope.menutitle = NavigationService.makeactive("Sail and Cruise on this Vacation | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Dive into the deep water of the Mediterranean Sea or just float on them with this exotic cruise. Get a carnival on the sea with this bachelor party package. ";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";
        break;

         //57//
         case'583946e4c4c7854ddcbdfdb7':
        $scope.menutitle = NavigationService.makeactive("Nothing Says Party like Tomorrowland | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "The world’s largest and most popular music festival, Tomorrowland automatically becomes the best party destination of the year! Celebrate in the city of Boom.";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";
        break;

         //58//
        case'58395294c4c7854ddcbdfe19':
        $scope.menutitle = NavigationService.makeactive("Know What’s Hot in the Year of 2017 | The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Amp it up in the Nights of Amsterdam | The Bachelor Trip";
        TemplateService.keywords = "Everyone loves Amsterdam for its flexible laws and nightlife but have you been part of its Light Art Festival? Enjoy the LED revolution on your bachelor night. ";
        break;
        default:
        TemplateService.description = "Before the wedding bells signal the end of your bachelorhood, get out and take the trip of a lifetime! Your bachelor trip will be a once-in-a-lifetime event and we are here to make sure it turns out to be so crazy that you won't even be able to talk about it!";
        TemplateService.keywords = "bachelor trip, bachelor party, bachelor party destinations, bachelor trip destinations, bachelorhood, best party destinations";
 }
        //=======switch=====//

        // =============== For Cart =================
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', input);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFun();
                $scope.cartData = {};
            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.onSubmitCart.close();
            }, 5000);
        }
        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFun();
        NavigationService.whatsHotMore($stateParams.id, function(data) {
            $scope.getOneWhatsHot = data.data.data.Details[0];
            console.log($scope.getOneWhatsHot);
        });
        $scope.myid = $stateParams.id;
        $scope.isInWishlistWhatsHotMore = function(id) {
            console.log('id', id);
            var indexF = _.findIndex($scope.getCartDataWhatsHot, function(key) {
                return key.whatshot._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.addTocartOnWhatsHot = function(id, type) {
            console.log(id, type);
            var indexF = _.findIndex($scope.getCartDataWhatsHot, function(key) {
                console.log('dfghjmkdfgvhbjncfvgbhhhhhhhhhhhhhhhhhhhh');
                console.log(key.whatshot._id);
                return key.whatshot._id == id;
            })
            if (indexF !== -1) {
                NavigationService.deleteCart(type, id, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFun();
                });
            } else {
                NavigationService.addCartWhatsHot(id, type, function(data) {
                    $scope.getData = data;
                    console.log('$scope.getData', $scope.getData);
                    $scope.getCartFun();
                });
            }
        }
        $scope.deleteCart = function(type, id) {
            console.log(type, id);
            NavigationService.deleteCart(type, id, function(data) {
                console.log('deleted', data);
                $scope.getCartFun();
            });
        }
        $scope.deleteCartAcco = function(type, name) {
                console.log(type, name);
                NavigationService.deleteCartAccomodation(type, name, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFun();
                });
            }
            // ===== End Cart ===========
    })
    .controller('WhatsHotCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {

        $scope.template = TemplateService.changecontent("whats-hot");
        $scope.menutitle = NavigationService.makeactive("Whats Hot");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "For the best party destinations, you should know the where the best upcoming parties are at and when. Check out Tomorrowland, the Grand Prix or luxury cruises.";
        TemplateService.keywords = "Bachelor trip, bachelor party, bachelor party package, bachelor party ideas, bachelor party themes, bachelor party destinations, bachelorette party";

        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        $scope.flags = {};
        $scope.flags.thankyou = false;
        $scope.details2 = function() {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/slider.html",
                scope: $scope,
                windowClass: "width80"
            });
        };
        $scope.cartd = function() {
            modal = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/cartdialog.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.cartr = function() {
            modal = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/cartdialogremove.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        // $scope.getCartFun = function() {
        //     NavigationService.getCart(function(data) {
        //         $scope.getCartDataActivity10 = data.data.data.activities;
        //         $scope.getCartDataPackage10 = data.data.data.package;
        //         $scope.getCartDataWhatsHot = data.data.data.whatshot;
        //         $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
        //         console.log('$scope.mergeActivity', $scope.getCartDataActivity);
        //         $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
        //         console.log('$scope.mergePackage', $scope.getCartDataPackage);
        //         $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage);
        //         console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
        //     });
        // }
        // $scope.getCartFun();
        NavigationService.HomeSlider(function(data) {
            $scope.mySlidesss = data.data.data.whatsHotBanner;
            $timeout(function() {
                TemplateService.removeLoader();
            }, 5000);

        });
        NavigationService.whatsHot(function(data) {
            $scope.myEvents = data.data.data.Events;
            console.log($scope.myEvents);
            $timeout(function() {
                TemplateService.removeLoader();
            }, 5000);
        });

        // =============== For Cart =================
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', input);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFun();
                $scope.cartData = {};
            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.onSubmitCart.close();
            }, 5000);
        }
        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFun();
        $scope.isInWishlistWhatsHot = function(id) {
            // console.log('id', id);
            var indexF = _.findIndex($scope.getCartDataWhatsHot, function(key) {
                return key.whatshot._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }

        $scope.addTocartOnWhatsHot10 = function(id, type) {
            console.log(id, type);
            var indexF = _.findIndex($scope.getCartDataWhatsHot, function(key) {
                console.log('dfghjmkdfgvhbjncfvgbhhhhhhhhhhhhhhhhhhhh');
                console.log(key.whatshot._id);
                return key.whatshot._id == id;
            })
            if (indexF !== -1) {
                NavigationService.deleteCart(type, id, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFun();
                });
            } else {
                NavigationService.addCartWhatsHot(id, type, function(data) {
                    $scope.getData = data;
                    console.log('$scope.getData', $scope.getData);
                    $scope.getCartFun();
                });
            }
        }

        // $scope.addTocartOnWhatsHot10 = function(id, type) {
        //         console.log(id, type);
        //         var indexF = _.findIndex($scope.myEvents, function(key) {
        //             return key._id == id;
        //         })
        //         if (indexF !== -1) {
        //             NavigationService.deleteCart(type, id, function(data) {
        //                 console.log('deleted', data);
        //                 $scope.getCartFun();
        //             });
        //         } else {
        //             NavigationService.addCartWhatsHot(id, type, function(data) {
        //                 $scope.getData = data;
        //                 console.log('$scope.getData', $scope.getData);
        //                 $scope.getCartFun();
        //             });
        //         }
        //     }
        // $scope.mySlides = [{
        //     img: "img/qwe.jpg",
        //     events: "TOMMOROWLAND",
        //     date: "27th Agust,2016"
        //
        //
        // }, {
        //     img: "img/qwe.jpg",
        //     events: "TOMMOROWLAND",
        //     date: "27th Agust,2016"
        //
        //
        // }, {
        //     img: "img/qwe.jpg",
        //     events: "TOMMOROWLAND",
        //     date: "27th Agust,2016"
        //
        //
        // }, {
        //     img: "img/qwe.jpg",
        //     events: "TOMMOROWLAND",
        //     date: "27th Agust,2016"
        //
        //
        // }];
        $scope.deleteCart = function(type, id) {
            console.log(type, id);
            NavigationService.deleteCart(type, id, function(data) {
                console.log('deleted', data);
                $scope.getCartFun();
            });
        }
        $scope.deleteCartAcco = function(type, name) {
            console.log(type, name);
            NavigationService.deleteCartAccomodation(type, name, function(data) {
                console.log('deleted', data);
                $scope.getCartFun();
            });
        }

        // ========== End Cart  =============
    })
    .controller('CustomisationCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $timeout, $state, $uibModal) {
        // var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {};
        // var $checkboxes = $("#checkbox-container :checkbox");
        //
        // $checkboxes.on("change", function() {
        //     $checkboxes.each(function() {
        //         checkboxValues[this.id] = this.checked;
        //     });
        //     localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
        // });
        // var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues'));
        // if (checkboxValues === null) {
        //     checkboxValues = {};
        // }
        // $.each(checkboxValues, function(key, value) {
        //     $("#" + key).prop('checked', value);
        // });


        var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {},
            $checkboxes = $("#checkbox-container :checkbox");

        $checkboxes.on("change", function() {
            $checkboxes.each(function() {
                checkboxValues[this.id] = this.checked;
            });

            localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
        });

        // On page load
        $.each(checkboxValues, function(key, value) {
            $("#" + key).prop('checked', value);
        });
        $scope.template = TemplateService.changecontent("customisation");
        $scope.menutitle = NavigationService.makeactive("Customisation");
        TemplateService.title = $scope.menutitle;
        TemplateService.description = "Before the wedding bells signal the end of your bachelorhood, get out and take the trip of a lifetime! Your bachelor trip will be a once-in-a-lifetime event and we are here to make sure it turns out to be so crazy that you won't even be able to talk about it!";
        TemplateService.keywords = "bachelor trip, bachelor party, bachelor party destinations, bachelor trip destinations, bachelorhood, best party destinations";

        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        $scope.currentDate = new Date();
        NavigationService.cityDetails($stateParams.id, function(data) {
            console.log(data.data.data.getDestination.name);
            $scope.nameofCust = data.data.data.getDestination.name;
            $scope.customisationDestForName = data.data.data.getDestination.name;
            console.log('$scope.customisationDestForName', $scope.customisationDestForName);
            $scope.customisationDest = data.data.data.getDestination.accomodation;
            $scope.customisationActivity = data.data.data.getActivity;
            TemplateService.removeLoader();
        });



        NavigationService.HomeSlider(function(data) {
            $scope.dropDown = data.data.data.DestinationDropdown;
            TemplateService.removeLoader();
        });

        $scope.yesISEmpty = true;
        $scope.getCartOnAcc = function() {
            NavigationService.getCustCart(function(data) {
                $scope.getCustomisationDeta = data.data.data;
                console.log('$scope.getCustomisationDetasssssssssssss', $scope.getCustomisationDeta.accomodation);
                $scope.getCartActi = $scope.getCustomisationDeta.activities;
                $scope.getCartAcco = $scope.getCustomisationDeta.accomodation;
                // console.log($scope.getCustomisationDeta.activities.length);
                // console.log($scope.getCustomisationDeta.accomodation.length);
                if ($scope.getCustomisationDeta.activities.length == 0 && $scope.getCustomisationDeta.accomodation.length == 0) {
                    $scope.yesISEmpty = true;
                } else {
                    $scope.yesISEmpty = false;
                }
                // TemplateService.removeLoader();
            });
            console.log('$scope.yesISEmpty', $scope.yesISEmpty);
        }

        $scope.getCartOnAcc();


        $scope.checkCart = function(id) {
            // console.log("aaa", id, $scope.getCartActi);
            var indexF = _.findIndex($scope.getCartActi, function(key) {
                return key.activities._id == id;
            });
            // console.log("indexF", indexF);
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }

        }
        $scope.checkCartAcco = function(name) {
            console.log("aaa", $scope.getCartAcco);
            var indexF = _.findIndex($scope.getCartAcco, function(key) {
                return key.name == name;
            });
            // console.log("indexF", indexF);
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }

        }

        // $scope.checkCart();
        $scope.checkCartAcco();
        $scope.viewLess = false;
        $scope.viewMore = false;

        $scope.selectedAll = {};
        $scope.selectedAll.location = true;
        $scope.checkAllLocation = function() {
            var toggleStatusLocation = $scope.selectedAll.location;
            _.forEach($scope.locationArr, function(location) {
                location.model = toggleStatusLocation;
            });
            $scope.searchExpert();
        };
        // $scope.locationArr = [];
        $scope.locationArr = [{
            value: 'day',
            model: true,
            image: 'frontend/img/Vector-Smart-Object1.png',
            imageClass: ""
        }, {
            value: 'night',
            model: true,
            image: 'frontend/img/Vector.png',
            imageClass: 'vector'
        }];
        $scope.noResult = false;
        $scope.searchExpert = function() {
            var y = 0;
            _.forEach($scope.locationArr, function(n) {
                if (!n.model || n.model == false) {
                    $scope.selectedAll.location = false;
                } else if (n.model == true) {
                    y++;
                }
            })
            if (y == $scope.locationArr.length) {
                $scope.selectedAll.location = true;
            }
            var dataToSend = {
                destination: $stateParams.id,
                type: []
            };
            console.log('$scope.locationArr', $scope.locationArr);
            dataToSend.type = _.map(_.filter($scope.locationArr, function(n) {
                return n.model
            }), 'value');
            NavigationService.getSearch(dataToSend, function(data) {
                console.log(data);
                // $scope.viewMore = true;
                if (data.data.data.Category.length > 6) {
                    $scope.viewMore = true;
                }
                if (data.data.data.Category.length == 0) {
                    $scope.viewMore = false;
                    $scope.noResult = true;
                } else {

                    $scope.noResult = false;
                    $scope.getActivity = data.data.data.Category;
                    console.log('data.data.data', $scope.getActivity.length);
                    $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                    $scope.getActivity = _.take($scope.getActivity, 6);
                }
            });
        };
        $scope.searchExpert();
        $scope.goOnCust = function(id, name) {
            // $scope.nameofCust = name;
            //   console.log('idd', $scope.nameofCust);
            if (id == undefined) {
                $scope.imDisable = true;
            } else {
                // $scope.imDisable = false;
                console.log(id);
                $state.go('customisation', {
                    id: id
                });
            }


        }
        $scope.loadMoreActivity = function() {
            console.log('inside loadmore fun');
            $scope.more = true;
            $scope.viewMore = false;
            $scope.viewLess = true;
            $scope.getActivity = $scope.getActivityArr;
        };

        //===before changed====
        // $scope.custDetailComplete = false;
        // $scope.custDetail = {};
        // $scope.custDetailSubmit = function(input) {
        //     console.log('input', input);
        //     NavigationService.enquiryForm($scope.custDetail, function(data) {
        //         console.log("data", data.value);
        //         if (data.value === true) {
        //             $scope.custDetailComplete = true;
        //             // $scope.custDetail = {};
        //             $timeout(function() {
        //                 $scope.custDetailComplete = false;
        //                 $scope.custDetail = {};
        //
        //             }, 2000);
        //         }
        //         // $state.reload();
        //     });
        // }
        // ==========================
        //==After changed=======
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/customisationCart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.custDetailComplete = false;
        $scope.custDetail = {};
        $scope.custDetailSubmit = function(input, myForm) {
                console.log('input', input);
                myForm.email.$touched = false;
                myForm.name.$touched = false;
                myForm.phone.$touched = false;
                myForm.size.$touched = false;
                myForm.from.$touched = false;
                myForm.to.$touched = false;
                myForm.plan.$touched = false;
                myForm.budget.$touched = false;
                NavigationService.cartCustomisationSubmit($scope.custDetail, function(data) {
                    console.log("data", data.data.value);
                    if (data.data.value === true) {
                        // $scope.custDetailComplete = true;
                        $scope.cartSubmitPopup();
                        NavigationService.deleteAllCartCustomisation(function(data) {
                            console.log(data);
                        })
                        $scope.custDetail = {};
                        $timeout(function() {
                            // $scope.custDetailComplete = false;
                            $scope.custDetail = {};
                            $scope.onSubmitCart.close();
                            $state.reload();
                        }, 5000);
                    }
                    // $state.reload();
                });
            }
            // =========================
        $scope.closeCart = function() {
            $scope.onSubmitCart.close();
            $state.reload();
        }
        $scope.custEnqComplete = false;
        $scope.custEnq = {};
        $scope.custEnqSubmit = function(input) {
            console.log('input', input);
            NavigationService.enquiryForm($scope.custEnq, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    $scope.custEnqComplete = true;
                    // $scope.custEnq = {};
                    $timeout(function() {
                        $scope.custEnqComplete = false;
                        $scope.custEnq = {};

                    }, 2000);
                }
                // $state.reload();
            });
        }
        $scope.selected = $stateParams.id;
        console.log($scope.selected);
        $scope.dropDownClick = function(dataid) {
            $state.go('customisation', {
                id: dataid
            });
            console.log(dataid);
            $stateParams.id = $scope.selected;

            console.log($stateParams.id);
        }

        // ==========================cart integration Customization page After ===========
        $scope.getData = {};

        $scope.addTocartOnAccomodation = function(type, dest, name, image, checkboxModel1) {
            console.log(type, dest, name, image, checkboxModel1);
            if (checkboxModel1 == true) {
                NavigationService.addCartAccomodation(type, dest, name, image, function(data) {
                    $scope.getData = data;
                    console.log('$scope.getData', data.data.data);
                    //  $scope.getCartFunCustomisation();
                });
                $scope.getCartOnAcc();

            } else {
                NavigationService.deleteCartAccomodation(type, name, function(data) {
                    console.log('deleted', data);
                    // $scope.getCartFunCustomisation();
                });
                $scope.getCartOnAcc();
            }
        }

        $scope.addTocartOnCustPage = function(id, type, checkboxModel) {
                console.log(id, type, checkboxModel);
                if (checkboxModel == true) {
                    NavigationService.addCartActivityCustomisation(id, type, function(data) {
                        $scope.getData = data;
                        console.log('$scope.getData', data.data.data);
                        // $scope.getCartFunCustomisation();
                    });
                    $scope.getCartOnAcc();
                } else {
                    NavigationService.deleteCartCustomisation(type, id, function(data) {
                        console.log('deleted', data);
                        //  $scope.getCartFunCustomisation();
                    });
                    $scope.getCartOnAcc();
                }
            }
            // console.log('$scope.getData0000', $scope.getData);
            // ==========================End Cart ===========================


        // ======================filter changed======================

        $scope.selectedAll = {};
        $scope.selectedAll.location = true;
        $scope.checkAllPackages = function() {

            $scope.searchAllPackages();
        };

        $scope.noResult = false;
        $scope.viewMoreActivity = false;
        $scope.viewLessActivity = false;
        $scope.day = {};
        $scope.night = {};
        $scope.day.model = false;
        $scope.night.model = false;
        $scope.searchAllPackages = function() {

            if ($scope.selectedAll.location == true) {
                $scope.day.model = false;
                $scope.night.model = false;
                var dataToSend = {
                    destination: $stateParams.id,
                    type: ["day", "night"]
                }
            } else {
                $scope.day.model = true;
                $scope.night.model = true;
                var dataToSend = {
                    destination: $stateParams.id,
                    type: []
                }
            }
            NavigationService.getSearch(dataToSend, function(data) {
                console.log('DTAA TO SEND', dataToSend);
                if (data.data.data.Category.length > 8) {
                    $scope.viewMoreActivity = true;
                }

                if (data.data.data.Category.length == 0) {
                    $scope.viewMoreActivity = false;
                    $scope.noResult = true;
                } else {

                    $scope.noResult = false;
                    $scope.getActivity = data.data.data.Category;
                    console.log('data.data.data', $scope.getActivity.length);
                    $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                    console.log('  $scope.getActivityArr', $scope.getActivityArr);
                    $scope.getActivity = _.take($scope.getActivity, 8);
                }
            });
        };
        $scope.searchDay = function() {
            console.log('dayclick');
            $scope.night.model = false;
            $scope.day.model = true;
            $scope.selectedAll.location = false;
            var dataToSend = {
                destination: $stateParams.id,
                type: ["day"]
            }
            NavigationService.getSearch(dataToSend, function(data) {
                console.log('DTAA TO SEND', dataToSend);
                if (data.data.data.Category.length > 8) {
                    $scope.viewMoreActivity = true;
                }

                if (data.data.data.Category.length == 0) {
                    $scope.viewMoreActivity = false;
                    $scope.noResult = true;
                } else {

                    $scope.noResult = false;
                    $scope.getActivity = data.data.data.Category;
                    console.log('data.data.data', $scope.getActivity.length);
                    $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                    $scope.getActivity = _.take($scope.getActivity, 6);
                }
            });
        }
        $scope.searchNight = function() {
                console.log('nightclick');
                $scope.day.model = false;
                console.log('$scope.day.model', $scope.day.model);
                $scope.night.model = true;

                $scope.selectedAll.location = false;
                var dataToSend = {
                    destination: $stateParams.id,
                    type: ["night"]
                }
                NavigationService.getSearch(dataToSend, function(data) {
                    console.log('DTAA TO SEND', dataToSend);
                    if (data.data.data.Category.length > 8) {
                        $scope.viewMoreActivity = true;
                    }

                    if (data.data.data.Category.length == 0) {
                        $scope.viewMoreActivity = false;
                        $scope.noResult = true;
                    } else {

                        $scope.noResult = false;
                        $scope.getActivity = data.data.data.Category;
                        console.log('data.data.data', $scope.getActivity.length);
                        $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                        console.log('  $scope.getActivityArr', $scope.getActivityArr);
                        $scope.getActivity = _.take($scope.getActivity, 8);
                    }
                });
            }
            // =======================filter end ===============================================



        // ================cart integration Customization page Before=====================
        // $scope.isInWishlistCustPage = function(id) {
        //     // console.log(id);
        //     var indexF = _.findIndex($scope.getCartDataActivityCust, function(key) {
        //         return key.activities._id == id;
        //     })
        //     if (indexF !== -1) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
        // $scope.isInWishlistAccomodation = function(accName) {
        //     // console.log(id);
        //     var indexF = _.findIndex($scope.getCartDataAccomodation, function(key) {
        //         return key.name == accName;
        //     })
        //     if (indexF !== -1) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
        // $scope.getCartFunCustomisation = function() {
        //     NavigationService.getCart(function(data) {
        //         $scope.getCartDataActivityCust = data.data.data.activities;
        //         $scope.getCartDataAccomodation = data.data.data.accomodation;
        //         console.log('$scope.getCartDataActivityCust', $scope.getCartDataActivityCust);
        //         $scope.getCartDataActivity10 = data.data.data.activities;
        //         $scope.getCartDataPackage10 = data.data.data.package;
        //         $scope.getCartDataWhatsHot = data.data.data.whatshot;
        //         $scope.getAccomodation = data.data.data.accomodation;
        //         $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
        //         $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
        //         $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
        //         $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
        //         $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
        //         console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
        //     });
        // }
        // $scope.getCartFunCustomisation();
        // $scope.addTocartOnCustPage = function(id, type) {
        //     console.log(id, type);
        //     var indexF = _.findIndex($scope.getCartDataActivityCust, function(key) {
        //         return key.activities._id == id;
        //     })
        //     if (indexF !== -1) {
        //         NavigationService.deleteCart(type, id, function(data) {
        //             console.log('deleted', data);
        //             $scope.getCartFunCustomisation();
        //         });
        //     } else {
        //         NavigationService.addCartActivity(id, type, function(data) {
        //             $scope.getData = data;
        //             console.log('$scope.getData', $scope.getData);
        //             $scope.getCartFunCustomisation();
        //         });
        //     }
        //
        //
        // }
        // $scope.addTocartOnAccomodation = function(type, dest, name, image, id) {
        //     console.log(type, dest, name, image, id);
        //     var indexF = _.findIndex($scope.getCartDataAccomodation, function(key) {
        //         return key.name == name;
        //     })
        //     if (indexF !== -1) {
        //         NavigationService.deleteCartAccomodation(type, name, function(data) {
        //             console.log('deleted', data);
        //             $scope.getCartFunCustomisation();
        //         });
        //     } else {
        //         NavigationService.addCartAccomodation(type, dest, name, image, function(data) {
        //             $scope.getData = data;
        //             console.log('$scope.getData', $scope.getData);
        //             $scope.getCartFunCustomisation();
        //         });
        //     }
        //
        //
        // }
        //
        // $scope.deleteCart = function(type, id) {
        //     console.log(type, id);
        //     NavigationService.deleteCart(type, id, function(data) {
        //         console.log('deleted', data);
        //         $scope.getCartFunCustomisation();
        //     });
        // }
        // $scope.deleteCartAcco = function(type, name) {
        //     console.log(type, name);
        //     NavigationService.deleteCartAccomodation(type, name, function(data) {
        //         console.log('deleted', data);
        //         $scope.getCartFunCustomisation();
        //     });
        // }
        //
        // $scope.submitCart = false;
        // $scope.cartData = {};
        // $scope.cartSubmit = function(input) {
        //         console.log('input', input);
        //         NavigationService.cart($scope.cartData, function(data) {
        //             console.log("data", data.value);
        //             if (data.value === true) {
        //                 NavigationService.deleteAllCart(function(data) {
        //                     console.log(data);
        //                 })
        //                 $scope.submitCart = true;
        //             }
        //         });
        //     }
        // ==================End of Cart=======================

    })

.controller('headerctrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);

        });

        // $scope.headerCartOpen10 = function() {
        //     console.log('cccccccccccccct');
        //     $scope.mycart10 = false;
        //     $scope.enquirybtn10 = true;
        // }
        // globalfunction.headerCartOpen10 = function() {
        //
        //     $scope.headerCartOpen10();
        // }


        // $scope.headerCartOpenCtrl = function() {
        //   console.log('yes hereeeeee');
        //   $scope.mycart10 = true;
        //   $scope.enquirybtn10 = false;
        // }
        // globalfunction.headerCartOpenCtrl = function() {
        //
        //         $scope.headerCartOpenCtrl();
        //     }
        // $scope.headerCartOpenUpPage = function() {
        //     $scope.mycart10 = true;
        //     $scope.enquirybtn10 = false;
        // }
        // globalfunction.headerCartOpenUpPage = function() {
        //
        //         $scope.headerCartOpenUpPage();
        //     }
        console.log('inside headerctrl');
        $scope.allDestMore = false;
        $scope.allActivitiesMore = false;
        $scope.allEventsMore = false;
        $.fancybox.close(true);
        TemplateService.removeLoaderOn(3)
        NavigationService.getAllDest(function(data) {
            $scope.onlyDest = _.take(data.data.data.allDestination, 49);
            $scope.onlyDest = _.chunk($scope.onlyDest, 10);
            console.log('data.data.data.allDestination', $scope.onlyDest);
            $scope.allDest = data.data.data.popularDestination;
            if (data.data.data.popularDestination.length > 5) {
                $scope.allDestMore = true;
            }
            console.log(data.data.data.popularDestination.length);
            $scope.allDest = _.take(data.data.data.popularDestination, 5);
            console.log('$scope.allDest', $scope.allDest);

            TemplateService.removeLoader();
        })
        NavigationService.ActivityLand(function(data) {
            $scope.allActivities = data.data.data.Images;
            if (data.data.data.Images.length > 5) {
                $scope.allActivitiesMore = true;
            }
            $scope.allActivities = _.take(data.data.data.Images, 5);
            TemplateService.removeLoader();
        });
        NavigationService.whatsHot(function(data) {
            $scope.allEvents = data.data.data.Events;
            if (data.data.data.Events.length > 5) {
                $scope.allEventsMore = true;
            }
            $scope.allEvents = _.take(data.data.data.Events, 5);
            console.log($scope.allEvents);
            TemplateService.removeLoader();
        });
        $scope.formData = {};
        $scope.formComplete = false;
        $scope.formSubmit = function(formData) {
            console.log("formData", formData);
            NavigationService.subscribe(formData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    $scope.formComplete = true;
                }
                $timeout(function() {
                    $scope.formComplete = false;
                    $scope.formData = {};
                }, 2000);

            })
        }

        //  ===== MY CART START ========
        $scope.cartSubmitPopup = function() {
            $scope.onSubmitCart = $uibModal.open({
                animation: true,
                templateUrl: "frontend/views/modal/mycart.html",
                windowClass: "modal-dialog2",
                scope: $scope
            });
        };
        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input, myForm) {
            console.log('input', input);
            myForm.email.$touched = false;
            myForm.name.$touched = false;
            myForm.phone.$touched = false;
            myForm.size.$touched = false;
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    $scope.cartSubmitPopup();
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
                $scope.getCartFunHeader();
                $scope.cartData = {};
            });
            $timeout(function() {
                console.log('inside timeout');
                $scope.submitCart = false;
                $scope.onSubmitCart.close();
            }, 5000);
        }
        $scope.getCartFunHeader = function() {
            console.log('inside gettttttt cart');
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivity10 = data.data.data.activities;
                $scope.getCartDataPackage10 = data.data.data.package;
                $scope.getCartDataWhatsHot = data.data.data.whatshot;
                $scope.getAccomodation = data.data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                $scope.checkCartIsEmpty = _.isEmpty($scope.mergeActivityPackage);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFunHeader();
        $scope.deleteCartAcco = function(type, name) {
            console.log(type, name);
            NavigationService.deleteCartAccomodation(type, name, function(data) {
                console.log('deleted', data);
                $scope.getCartFunHeader();
            });
        }

    })
    .controller('footerCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        console.log("footerCtrl");
        $scope.subscribeData = {};
        $scope.subscribeComplete = false;
        $scope.alreadySubscribed = false;
        $scope.subscribeSubmit = function(subscribeData) {
            console.log("sadsadasdsads");
            console.log("subscribeData", subscribeData);
            NavigationService.subscribe(subscribeData, function(data) {
                console.log("data", data.value);
                if (data.data.data) {
                    console.log('hhhhhhhhh');
                    $scope.subscribeComplete = true;
                    $timeout(function() {
                        $scope.subscribeComplete = false;
                        $scope.subscribeData = {};
                    }, 2000);
                } else {
                    console.log('eeeeeeeeeee');
                    console.log('inside elseeee');
                    $scope.alreadySubscribed = true;
                    $timeout(function() {
                        $scope.alreadySubscribed = false;
                        $scope.subscribeData = {};
                    }, 2000);
                }


            })
        }
    })
    .controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function() {
            // console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };


    })

;
