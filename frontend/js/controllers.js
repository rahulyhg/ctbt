var globalfunction = {};

angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ksSwiper', 'wu.masonry'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file

        console.log("Testing Consoles");

        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formdata = {};
        $scope.selectDesti = function(id) {
            // state.go(pattaya{id:formdata})
            console.log("id", id);
        }




        NavigationService.HomeSlider(function(data) {
            $scope.mySlidestop = data.data.HomeSlider;

            $scope.popularDestination = data.data.popularDestination;

            $scope.popularAttraction = data.data.popularAttraction;
            $scope.dropDown = data.data.DestinationDropdown;

            $scope.mySlidesss = data.data.whatsHotBanner;
            console.log("$scope.mySlides", $scope.mySlidesss);
        });
        $scope.imDisable = false;
        $scope.goOn = function(id) {
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
        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input) {
            console.log('input', input);
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
            });
        }
        $scope.getCartFunHeader = function() {
            console.log('inside gettttttt cart');
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivity10 = data.data.activities;
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getAccomodation = data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
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

        // =============== End Cart =================
    })
    .controller('ComingsoonCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {


        $scope.template = TemplateService.changecontent("comingsoon");
        $scope.menutitle = NavigationService.makeactive("Comingsoon");
        $scope.template.header = "";
        $scope.template.headermenu = "";
        $scope.template.footermenu = "";
        $scope.template.footer = "";
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })

    .controller('MediaCornerCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {


        $scope.template = TemplateService.changecontent("mediacorner");
        $scope.menutitle = NavigationService.makeactive("MediaCorner");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })

    .controller('AboutCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {


        $scope.template = TemplateService.changecontent("about");
        $scope.menutitle = NavigationService.makeactive("About");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })
    .controller('ActivityCtrl', function($scope, TemplateService, NavigationService, $timeout) {

        $scope.template = TemplateService.changecontent("activity");
        $scope.menutitle = NavigationService.makeactive("Activity");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.changeDestination = function(id) {
            if (id) {
                console.log(id);
                $scope.saveDestId = id;
                NavigationService.getChangeDestination(id, function(data) {
                    $scope.changeDestData = data.data.Images;
                    $scope.showBttn = data.data.Images;
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
                });

            } else {
                console.log('m in else');
                $scope.viewLess = false;
                $scope.viewMore = false;
                $scope.loadLessActivities();
            }

        }

        NavigationService.ActivityLand(function(data) {
            $scope.Banner = data.data.Banner;
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
                $scope.myDropdown = data.data.DestinationDropdown;
                $scope.showBttn = data.data.Images;
                console.log('$scope.showBttn', $scope.showBttn.length);
                var images = _.groupBy(data.data.Images, function(n) {
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
                        console.log('hbnjbbbbbbbbbbbbbbbbbbbbbbbbbb');
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
        }

        // =============== For Cart =================

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input) {
            console.log('input', input);
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
            });
        }

        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivityPage = data.data.activities;
                console.log('$scope.getCartDataActivityPage', $scope.getCartDataActivityPage);

                // $scope.getCartDataActivity10 = data.data.activities;
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getAccomodation = data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
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
                NavigationService.addCartActivity(id, type, function(data) {
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

        $scope.template = TemplateService.changecontent("tbtstatic");
        $scope.menutitle = NavigationService.makeactive("The Bachelor Trip");
        TemplateService.title = $scope.menutitle;
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


    })

.controller('DestinationCtrl', function($scope, TemplateService, NavigationService, $timeout) {

        $scope.template = TemplateService.changecontent("destination");
        $scope.menutitle = NavigationService.makeactive("Destination");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.show = {};
        $scope.show = false;

        NavigationService.DestinationLand(function(data) {

            $scope.DestinationLand = data.data.popularDestination;
            $scope.DestinationLand = _.chunk(data.data.popularDestination, 2);
            console.log("$scope.DestinationLand", $scope.DestinationLand);
            $scope.allDestination = _.take(data.data.allDestination, 6);
            console.log("$scope.DestinationLand", $scope.allDestination);
            $scope.viewMoreDest = function() {
                $scope.show = true;
                $scope.allDestination = data.data.allDestination;
            };
            $scope.viewLessDest = function() {
                $scope.show = false;
                $scope.allDestination = _.take(data.data.allDestination, 6);
            }
        })


        // =============== For Cart =================

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input) {
            console.log('input', input);
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
            });
        }
        $scope.getCartFunHeader = function() {
            console.log('inside gettttttt cart');
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivity10 = data.data.activities;
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getAccomodation = data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
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
    .controller('PattayaCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $uibModal) {

        $scope.template = TemplateService.changecontent("pattaya");
        $scope.menutitle = NavigationService.makeactive("Pattaya");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
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

            // $scope.accordian.push({
            //     isFirstOpen: true,
            //     isFirstDisabled: false
            // });
            // $scope.accordian.push({
            //     isFirstOpen: true,
            //     isFirstDisabled: false
            // });
            // $scope.accordian.push({
            //     isFirstOpen: true,
            //     isFirstDisabled: false
            // });
            // $scope.accordian.push({
            //     isFirstOpen: true,
            //     isFirstDisabled: false
            // });
            // $scope.options = [{
            //     value: 'day',
            //     selected: true
            // }, {
            //     value: 'night',
            //     selected: true
            // }];
            // $scope.isAllSelected = true;
            // $scope.toggleAll = function() {
            //     var toggleStatus = !$scope.isAllSelected;
            //     angular.forEach($scope.options, function(itm) {
            //         itm.selected = toggleStatus;
            //     });
            // }
            // $scope.typeArr = [];
            // var dataToSend = {
            //     destination: $stateParams.id,
            //     type: [],
            // };
            //
            // $scope.searchChange = function(val) {
            //     console.log(val);
            //     $scope.isAllSelected = $scope.options.every(function(itm) {
            //         return itm.selected;
            //     })
            //     var foundIndex = dataToSend.type.indexOf(val);
            //     if (foundIndex == -1) {
            //         dataToSend.type.push(val);
            //         console.log('if  dataToSend.type', dataToSend.type);
            //     } else {
            //         dataToSend.type.splice(foundIndex, 1);
            //         console.log('else  dataToSend.type', dataToSend.type);
            //     }
            //
            //     NavigationService.getSearch(dataToSend, function(data) {
            //         $scope.getActivity = data.data.Category;
            //     });
            //
            // };
        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivityPattayaPage = data.data.activities;
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getAccomodation = data.data.accomodation;
                console.log('accmoddddddddddd1000000000000000000', $scope.getAccomodation);
                // $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                // $scope.getCartDataWhatsHot10 = _.chain(data.data.whatshot)
                //         .groupBy("whatshot.name")
                //         .toPairs()
                //         .map(function(currentItem) {
                //             return _.zipObject(["name", "item"], currentItem);
                //         })
                //         .value();
                //         console.log($scope.getCartDataWhatsHot10);
                // $scope.getCartDataActivity = _.chain(data.data.activities)
                //         .groupBy('activities.destination.name')
                //         .toPairs()
                //         .map(function(currentItem) {
                //             return _.zipObject(["name", "items"], currentItem);
                //         })
                //         .value();
                // $scope.getCartDataPackage = _.chain(data.data.package)
                //         .groupBy('package.destination.name')
                //         .toPairs()
                //         .map(function(currentItem) {
                //             return _.zipObject(["name", "items"], currentItem);
                //         })
                //         .value();
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
                console.log('accmoddddddddddd', $scope.getAccomodation10);
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
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
                $scope.getTitle = data.data.getTitle;
                $scope.getDestination = data.data.getDestination;
                console.log('$scope.myvideoUrl', data.data.getDestination.video);
                $scope.getUrl = data.data.getDestination.video;
                // $scope.$apply();
                // $.jStorage.set("videoUrl",$scope.getUrl);
                // $scope.myvideoUrl = $.jStorage.get("videoUrl");
                // $scope.$apply();


                $scope.getPackage = data.data.getPackage;
                console.log('$scope.getPackage', $scope.getPackage);
                if (data.data.getPackage.length > 8) {
                    $scope.viewMore = true;
                }
                // $scope.getActivity = data.data.getActivity;
                // console.log('$scope.getActivity',$scope.getActivity);
                // $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                $scope.getPackageArr = _.cloneDeep($scope.getPackage);
                // $scope.viewMore = true;
                $scope.getPackage = _.take($scope.getPackage, 8);
                // $scope.getActivity = _.take($scope.getActivity, 4);
                // _.forEach($scope.getActivity, function(n) {
                //   console.log(n);
                //     $scope.locationArr.push({
                //         value: n.type,
                //         model: true
                //     });
                // });
                // console.log($scope.locationArr);
            });


        };

        $scope.loadLessPackage();




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
        $scope.viewMoreActivity = false;
        $scope.viewLessActivity = false;

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
                if (data.data.Category.length > 8) {
                    $scope.viewMoreActivity = true;
                }

                if (data.data.Category.length == 0) {
                    $scope.viewMoreActivity = false;
                    $scope.noResult = true;
                } else {

                    $scope.noResult = false;
                    $scope.getActivity = data.data.Category;
                    console.log('data.data', $scope.getActivity.length);
                    $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                    console.log('  $scope.getActivityArr', $scope.getActivityArr);
                    $scope.getActivity = _.take($scope.getActivity, 8);
                    // NavigationService.cityDetails($stateParams.id, function(data) {
                    //     $scope.getActivity = data.data.getActivity;
                    //     console.log('$scope.getActivity', $scope.getActivity);
                    //     $scope.getActivity = _.take($scope.getActivity, 4);
                    //     if ($scope.locationArr.length == 0) {
                    //         console.log('inside if');
                    //         _.forEach($scope.getActivity, function(n) {
                    //             console.log(n);
                    //             $scope.locationArr.push({
                    //                 value: n.type,
                    //                 model: true
                    //             });
                    //         });
                    //         console.log($scope.locationArr);
                    //     }
                    // });
                }
            });
        };
        $scope.searchExpert();
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
        $scope.enquirySubmit = function(input) {
            console.log('input', input);
            NavigationService.enquiryForm($scope.enquiryData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    //   $timeout(function() {
                    //     $scope.open4();
                    //   },1000);
                    //   // $scope.open4();
                    //   $timeout(function() {
                    //     $scope.modalInstance.close();
                    //       // $scope.formComplete = false;
                    //       // $scope.enquiryData = {};
                    //   },6000);
                    //     // $scope.formComplete = true;
                }

                // console.log('input',input);
                // console.log('data',data);
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
        // $scope.accordian = [];
        //
        // // $scope.accordian.isFirstDisabled = false;
        // $scope.accordian.push({
        //     isFirstOpen: true,
        //     isFirstDisabled: false
        // });

        $scope.DestinationTitle = '';
        $scope.openMe = false;
        $scope.goToFunction = function(id) {
            $scope.DestinationTitle = '';
            NavigationService.DestinationContent(id, function(data) {
                $scope.DestinationTitle = data.data.getTitle;
                $scope.openMe = true;
                console.log("$scope.DestinationTitle", $scope.DestinationTitle);
            });
        };
        $scope.cart = false;
        // $scope.addPackageToCart = function(id) {
        //     console.log("id", id);
        //     $scope.cart = true;
        //
        // }
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



        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input) {
            console.log('input', input);
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
            });
        }

    })
    .controller('Pattaya2Ctrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {

        $scope.template = TemplateService.changecontent("pattaya2");
        $scope.menutitle = NavigationService.makeactive("Pattaya2");
        TemplateService.title = $scope.menutitle;
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
            console.log(data.data);
            $scope.getPattaya2 = data.data.packageDetails;
            console.log("$scope.getPattaya2", $scope.getPattaya2);
        })

        $scope.formComplete = false;
        $scope.enquiryData = {};
        $scope.enquirySubmitPatt2 = function(input) {
                console.log('input', input);
                NavigationService.enquiryForm($scope.enquiryData, function(data) {
                    console.log("data", data.value);
                    if (data.value === true) {}
                });
            }
            // =============== For Cart =================

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input) {
            console.log('input', input);
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
            });
        }
        $scope.getCartFunPattaya2 = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataActivity10 = data.data.activities;
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getAccomodation = data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
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
        $scope.menutitle = NavigationService.makeactive("Whats-hot-more");
        TemplateService.title = $scope.menutitle;
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

        // =============== For Cart =================

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input) {
            console.log('input', input);
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
            });
        }
        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getCartDataActivity10 = data.data.activities;
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getAccomodation = data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFun();
        NavigationService.whatsHotMore($stateParams.id, function(data) {
            $scope.getOneWhatsHot = data.data.Details[0];
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
        $scope.navigation = NavigationService.getnav();
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
        // $scope.getCartFun = function() {
        //     NavigationService.getCart(function(data) {
        //         $scope.getCartDataActivity10 = data.data.activities;
        //         $scope.getCartDataPackage10 = data.data.package;
        //         $scope.getCartDataWhatsHot = data.data.whatshot;
        //         $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
        //         console.log('$scope.mergeActivity', $scope.getCartDataActivity);
        //         $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
        //         console.log('$scope.mergePackage', $scope.getCartDataPackage);
        //         $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage);
        //         console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
        //     });
        // }
        // $scope.getCartFun();
        NavigationService.HomeSlider(function(data) {
            $scope.mySlidesss = data.data.whatsHotBanner;
        });
        NavigationService.whatsHot(function(data) {
            $scope.myEvents = data.data.Events;
            console.log($scope.myEvents);
        });

        // =============== For Cart =================

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input) {
            console.log('input', input);
            NavigationService.cart($scope.cartData, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    NavigationService.deleteAllCart(function(data) {
                        console.log(data);
                    })
                    $scope.submitCart = true;
                }
            });
        }
        $scope.getCartFun = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getCartDataActivity10 = data.data.activities;
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getAccomodation = data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFun();
        $scope.isInWishlistWhatsHot = function(id) {
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
    .controller('CustomisationCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $timeout, $state) {

        $scope.template = TemplateService.changecontent("customisation");
        $scope.menutitle = NavigationService.makeactive("Customisation");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        NavigationService.cityDetails($stateParams.id, function(data) {
            console.log(data.data.getDestination.accomodation);
            $scope.customisationDestForName = data.data.getDestination.name;
            $scope.customisationDest = data.data.getDestination.accomodation;
            $scope.customisationActivity = data.data.getActivity;
        })
        NavigationService.HomeSlider(function(data) {
            $scope.dropDown = data.data.DestinationDropdown;
        });
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
                // $scope.viewMore = true;
                if (data.data.Category.length > 6) {
                    $scope.viewMore = true;
                }
                if (data.data.Category.length == 0) {
                    $scope.viewMore = false;
                    $scope.noResult = true;
                } else {

                    $scope.noResult = false;
                    $scope.getActivity = data.data.Category;
                    console.log('data.data', $scope.getActivity.length);
                    $scope.getActivityArr = _.cloneDeep($scope.getActivity);
                    $scope.getActivity = _.take($scope.getActivity, 6);
                }
            });
        };
        $scope.searchExpert();
        $scope.loadMoreActivity = function() {
            console.log('inside loadmore fun');
            $scope.more = true;
            $scope.viewMore = false;
            $scope.viewLess = true;
            $scope.getActivity = $scope.getActivityArr;
        };
        $scope.custDetailComplete = false;
        $scope.custDetail = {};
        $scope.custDetailSubmit = function(input) {
            console.log('input', input);
            NavigationService.enquiryForm($scope.custDetail, function(data) {
                console.log("data", data.value);
                if (data.value === true) {
                    $scope.custDetailComplete = true;
                    // $scope.custDetail = {};
                    $timeout(function() {
                        $scope.custDetailComplete = false;
                        $scope.custDetail = {};

                    }, 2000);
                }
                // $state.reload();
            });
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

        // ================cart integration Customization page=====================
        $scope.isInWishlistCustPage = function(id) {
            // console.log(id);
            var indexF = _.findIndex($scope.getCartDataActivityCust, function(key) {
                return key.activities._id == id;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.isInWishlistAccomodation = function(accName) {
            // console.log(id);
            var indexF = _.findIndex($scope.getCartDataAccomodation, function(key) {
                return key.name == accName;
            })
            if (indexF !== -1) {
                return true;
            } else {
                return false;
            }
        }
        $scope.getCartFunCustomisation = function() {
            NavigationService.getCart(function(data) {
                $scope.getCartDataActivityCust = data.data.activities;
                $scope.getCartDataAccomodation = data.data.accomodation;
                console.log('$scope.getCartDataActivityCust', $scope.getCartDataActivityCust);
                $scope.getCartDataActivity10 = data.data.activities;
                $scope.getCartDataPackage10 = data.data.package;
                $scope.getCartDataWhatsHot = data.data.whatshot;
                $scope.getAccomodation = data.data.accomodation;
                $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
                $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
                $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
                $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
                $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
                console.log('$scope.mergeActivityPackage', $scope.mergeActivityPackage);
            });
        }
        $scope.getCartFunCustomisation();
        $scope.addTocartOnCustPage = function(id, type) {
            console.log(id, type);
            var indexF = _.findIndex($scope.getCartDataActivityCust, function(key) {
                return key.activities._id == id;
            })
            if (indexF !== -1) {
                NavigationService.deleteCart(type, id, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFunCustomisation();
                });
            } else {
                NavigationService.addCartActivity(id, type, function(data) {
                    $scope.getData = data;
                    console.log('$scope.getData', $scope.getData);
                    $scope.getCartFunCustomisation();
                });
            }


        }
        $scope.addTocartOnAccomodation = function(type, dest, name, image, id) {
            console.log(type, dest, name, image, id);
            var indexF = _.findIndex($scope.getCartDataAccomodation, function(key) {
                return key.name == name;
            })
            if (indexF !== -1) {
                NavigationService.deleteCartAccomodation(type, name, function(data) {
                    console.log('deleted', data);
                    $scope.getCartFunCustomisation();
                });
            } else {
                NavigationService.addCartAccomodation(type, dest, name, image, function(data) {
                    $scope.getData = data;
                    console.log('$scope.getData', $scope.getData);
                    $scope.getCartFunCustomisation();
                });
            }


        }

        $scope.deleteCart = function(type, id) {
            console.log(type, id);
            NavigationService.deleteCart(type, id, function(data) {
                console.log('deleted', data);
                $scope.getCartFunCustomisation();
            });
        }
        $scope.deleteCartAcco = function(type, name) {
            console.log(type, name);
            NavigationService.deleteCartAccomodation(type, name, function(data) {
                console.log('deleted', data);
                $scope.getCartFunCustomisation();
            });
        }

        $scope.submitCart = false;
        $scope.cartData = {};
        $scope.cartSubmit = function(input) {
                console.log('input', input);
                NavigationService.cart($scope.cartData, function(data) {
                    console.log("data", data.value);
                    if (data.value === true) {
                        NavigationService.deleteAllCart(function(data) {
                            console.log(data);
                        })
                        $scope.submitCart = true;
                    }
                });
            }
            // ==================End of Cart=======================

    })

.controller('headerctrl', function($scope, TemplateService, NavigationService) {
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
    NavigationService.getAllDest(function(data) {
        $scope.allDest = data.data.popularDestination;
        if (data.data.popularDestination.length > 5) {
            $scope.allDestMore = true;
        }
        console.log(data.data.popularDestination.length);
        $scope.allDest = _.take(data.data.popularDestination, 5);
        console.log('$scope.allDest', $scope.allDest);
    })
    NavigationService.ActivityLand(function(data) {
        $scope.allActivities = data.data.Images;
        if (data.data.Images.length > 5) {
            $scope.allActivitiesMore = true;
        }
        $scope.allActivities = _.take(data.data.Images, 5);
    });
    NavigationService.whatsHot(function(data) {
        $scope.allEvents = data.data.Events;
        if (data.data.Events.length > 5) {
            $scope.allEventsMore = true;
        }
        $scope.allEvents = _.take(data.data.Events, 5);
        console.log($scope.allEvents);
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
    $scope.submitCart = false;
    $scope.cartData = {};
    $scope.cartSubmit = function(input) {
        console.log('input', input);
        NavigationService.cart($scope.cartData, function(data) {
            console.log("data", data.value);
            if (data.value === true) {
                NavigationService.deleteAllCart(function(data) {
                    console.log(data);
                })
                $scope.submitCart = true;
            }
        });
    }
    $scope.getCartFunHeader = function() {
        console.log('inside gettttttt cart');
        NavigationService.getCart(function(data) {
            $scope.getCartDataActivity10 = data.data.activities;
            $scope.getCartDataPackage10 = data.data.package;
            $scope.getCartDataWhatsHot = data.data.whatshot;
            $scope.getAccomodation = data.data.accomodation;
            $scope.getCartDataWhatsHot10 = _.groupBy(data.data.whatshot, 'whatshot.name');
            $scope.getCartDataActivity = _.groupBy(data.data.activities, 'activities.destination.name');
            $scope.getCartDataPackage = _.groupBy(data.data.package, 'package.destination.name');
            $scope.getAccomodation10 = _.groupBy(data.data.accomodation, 'destination');
            $scope.mergeActivityPackage = _.merge($scope.getCartDataActivity, $scope.getCartDataPackage, $scope.getCartDataWhatsHot10, $scope.getAccomodation10);
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
